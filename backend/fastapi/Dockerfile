FROM python:3.8.10-slim
COPY . /app
WORKDIR /app
RUN pip install -U pip==20.3
RUN apt-get update && \
    apt-get install -y gcc git
RUN pip install --use-deprecated=legacy-resolver -r requirements.txt
RUN pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
# Google Chrome 설치
RUN apt-get -y update
RUN apt-get -y install wget
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get -y install ./google-chrome-stable_current_amd64.deb

EXPOSE 8000
ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]