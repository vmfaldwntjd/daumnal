from sqlalchemy import Column, BIGINT, CHAR, INT, select, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

from database import EngineConn

Base = declarative_base()


# 다음날 db
class Emotion(Base):
    __tablename__ = "emotion"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    fear = Column(INT)
    surprise = Column(INT)
    angry = Column(INT)
    sadness = Column(INT)
    neutral = Column(INT)
    happiness = Column(INT)
    disgust = Column(INT)


class Music(Base):
    __tablename__ = "music"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    emotion_id = Column(BIGINT, ForeignKey('emotion.id'), nullable=False, unique=True)
    category = Column(CHAR)


class Diary(Base):
    __tablename__ = "diary"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    emotion_id = Column(BIGINT, ForeignKey('emotion.id'), nullable=False, unique=True)
    music_id = Column(BIGINT, default=None)


class QuerySet:
    def __init__(self):
        self.engine = EngineConn()

    def get_diary_with_emotion(self, diary_id):
        session = self.engine.sessionmaker()
        query1 = session.query(Diary).filter(Diary.id == diary_id)
        tmp_q = query1.subquery()
        query2 = session.query(Emotion).join(tmp_q, tmp_q.c.emotion_id == Emotion.id)
        return query1.all(), query2.all()

    def get_music_with_emotion(self, category):
        session = self.engine.sessionmaker()
        query1 = session.query(Music).filter(Music.category == category)
        tmp_q = query1.subquery()
        query2 = session.query(Emotion).join(tmp_q, tmp_q.c.emotion_id == Emotion.id)

        return query1.all(), query2.all()
