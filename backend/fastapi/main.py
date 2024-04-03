from fastapi import FastAPI, HTTPException, Header, Request
import httpx

from typing import Optional
from pydantic import BaseModel

import emotion_classifier

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from model import QuerySet
import recommend

# FastAPI 호출
app = FastAPI()

# cors 설정
origins = ["https://daumnal.n-e.kr", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# kobert 모델 세팅
@app.on_event("startup")
async def startup_event():
    emotion_classifier.init()


# db 세팅
qs = QuerySet()


# 객체
class DiaryContent(BaseModel):
    diaryContent: str


class Emotion(BaseModel):
    fear: int = 0
    surprise: int = 0
    angry: int = 0
    sadness: int = 0
    neutral: int = 0
    happiness: int = 0
    disgust: int = 0


# 예외 처리
class UnicornException(Exception):
    def __init__(self, status: str):
        self.status = status


@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=400,
        content={"status": exc.status}
    )


# 일기 검사 api
@app.post("/api/diaries")
async def analyze_diary(
        diary_content: DiaryContent,
        authorization: str = Header(..., alias="Authorization")
):
    try:
        diary_emotion = emotion_classifier.analyze_init(diary_content.diaryContent)
        if diary_emotion is None:
            raise UnicornException(status="sentenceLack")
        elif diary_emotion.neutral > 5000:
            # 1등이 중립이 아닌 걸로 예외 처리 필요
            raise UnicornException(status="emotionLack")

        # 성공 시 입력된 데이터를 반환
        return {
            "code": 200,
            "status": "OK",
            "message": "일기 감정 분석 성공",
            "data": {
                "diaryEmotion": diary_emotion.model_dump()
            }
        }
    except Exception as e:
        # 에러 발생 시 적절한 에러 메시지와 에러 코드 반환
        return e


# 노래 추천 api
@app.get("/api/musics/{music_category}/diaries/{diary_id}")
async def recommend_music(
        music_category: str, diary_id: int,
        authorization: str = Header(..., alias="Authorization")
):
    try:
        diary_info, diary_emotion = qs.get_diary_with_emotion(diary_id)
        if diary_info[0].music_id is not None:
            raise UnicornException(status="alreadyRecommended")
        elif diary_emotion[0] is None:
            raise UnicornException(status="wrongDiaryNumber")
        music_ids, music_emotions = qs.get_music_with_emotion(music_category)
        recommended_music_id = recommend.recomm(diary_emotion[0], music_ids, music_emotions, authorization)

        base_url = "https://daumnal.n-e.kr/api"
        url = f"{base_url}/diaries/{diary_id}/musics/{recommended_music_id.id}"


        headers = {
            "Authorization": authorization
        }

        async with httpx.AsyncClient() as client:
            response = await client.patch(url, headers=headers)
            print(response)

        return {
            "code": 200,
            "status": "OK",
            "message": "선택 기반 노래 추천 성공",
            "data": {
                "musicId": recommended_music_id.id
            }
        }
    except Exception as e:
        return e