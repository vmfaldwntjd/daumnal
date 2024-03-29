FROM python:3.8.10-slim
EXPOSE 8000
# 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y gcc git wget
# Google Chrome 설치
RUN apt-get -y update && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get -y install ./google-chrome-stable_current_amd64.deb
# 코버트 설치
RUN pip install -U pip==20.3
RUN pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
COPY . /app
WORKDIR /app
# requirements.txt 설치
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt
# FastAPI 실행
ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]