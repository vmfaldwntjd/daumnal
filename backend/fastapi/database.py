from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

DB_URL = 'mysql+pymysql://root:daumnal107@j10a107.p.ssafy.io:3300/daumnal'
# DB_URL = 'mysql+pymysql://root:daumnal107@j10a107.p.ssafy.io:3306/daumnal'
# DB_URL = 'mysql+pymysql://root:ssafy@localhost:3306/world'


class EngineConn:

    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn
