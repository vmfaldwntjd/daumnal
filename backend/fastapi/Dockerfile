FROM python:3.8.10-alpine
COPY . /app
WORKDIR /app
RUN pip install -U pip==20.3 && \
    pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf' && \
    pip install --use-deprecated=legacy-resolver -r requirements.txt
# Google Chrome 설치
RUN apt-get -y update && \
    apt-get -y install wget && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get -y install ./google-chrome-stable_current_amd64.deb

EXPOSE 8000
ENTRYPOINT ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0"]