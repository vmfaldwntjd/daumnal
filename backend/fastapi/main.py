from fastapi import FastAPI, Header, HTTPException

from typing import Optional
from pydantic import BaseModel

import emotion_classifier

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


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


@app.on_event("startup")
async def startup_event():
    emotion_classifier.init()


class UnicornException(Exception):
    def __init__(self, status: str):
        self.status = status


@app.exception_handler(UnicornException)
async def unicorn_exception_handler(exc: UnicornException):
    return JSONResponse(
        status_code=400,
        content={"status": exc.status}
    )


@app.post("/api/diaries")
async def analyze_diary(
        # authorization: str = Header(..., alias="Authorization"),
        item: Item
):
    try:
        diary_emotion = emotion_classifier.analyze_init(item.diaryContent)
        if diary_emotion is None:
            raise UnicornException(status="sentenceLack")
        elif diary_emotion.neutral > 5000:
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
