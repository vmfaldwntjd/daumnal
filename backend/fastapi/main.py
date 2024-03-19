from fastapi import FastAPI, Header, HTTPException

from typing import Optional
from pydantic import BaseModel

import emotion_classifier

from fastapi.middleware.cors import CORSMiddleware


class Item(BaseModel):
    diaryContent: str


class Emotion(BaseModel):
    fear: int = 0
    surprise: int = 0
    angry: int = 0
    sadness: int = 0
    neutral: int = 0
    happiness: int = 0
    disgust: int = 0


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/diaries")
async def analyze_diary(
        # authorization: str = Header(..., alias="Authorization"),
        item: Item
):
    try:
        if len(item.diaryContent) > 3000:
            raise HTTPException(status_code=400, detail="너무 길어요.")

        diary_emotion = emotion_classifier.analyze_init(item.diaryContent)
        if diary_emotion is None:
            raise HTTPException(status_code=400, detail="감정 분석을 위해 일기를 충분히 써 주세요.")
        elif diary_emotion.neutral > 3500:
            raise HTTPException(status_code=400, detail="감정을 조금 더 담아서 일기를 써 주세요.")

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
        return {str(e)}
