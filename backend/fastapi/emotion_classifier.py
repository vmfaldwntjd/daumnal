import torch
from torch import nn
from torch.utils.data import Dataset
import gluonnlp as nlp
import numpy as np

from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel

from pydantic import BaseModel
import re


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, vocab, max_len, pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, vocab=vocab, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size=768,
                 num_classes=7,  # 감정 클래스 수로 조정
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids=token_ids, token_type_ids=segment_ids.long(),
                              attention_mask=attention_mask.float().to(token_ids.device), return_dict=False)
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


device = None
tokenizer = None
bertmodel = None
vocab = None
tok = None
model = None

max_len = 64
batch_size = 64


def init():
    global device, tokenizer, bertmodel, vocab, tok, model, max_len, batch_size
    device = torch.device("cpu")
    tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
    bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
    vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')

    tok = tokenizer.tokenize
    model = BERTClassifier(bertmodel, dr_rate=0.5).to(device)
    model.load_state_dict(torch.load("trained_params.pt", map_location=torch.device('cpu')))
    model.eval()


def predict(sentences):  # input = 감정분류하고자 하는 sentence
    print(sentences)
    dataset_another = []
    for i, sentence in enumerate(sentences):
        dataset_another.append([sentence, str(i)])

    another_test = BERTDataset(dataset_another, 0, 1, tok, vocab, max_len, True,
                               False)  # 토큰화한 문장
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size,
                                                  num_workers=5)  # torch 형식 변환

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length

        out = model(token_ids, valid_length, segment_ids)

        emotion_codes = []
        for i in out:  # out = model(token_ids, valid_length, segment_ids)
            logits = i.detach().cpu().numpy()
            emotion_codes.append(np.argmax(logits))

        print(emotion_codes)
        return emotion_codes


class Emotion(BaseModel):
    fear: int = 0
    surprise: int = 0
    angry: int = 0
    sadness: int = 0
    neutral: int = 0
    happiness: int = 0
    disgust: int = 0


def analyze_init(content):
    sentences = re.split('[.,!?\n]', content)

    if len(sentences) < 3:
        return None

    emotion_results = [0] * 7
    total_len = 0

    emotion_codes = predict(sentences)
    for emotion_code, sentence in zip(emotion_codes, sentences):
        emotion_results[emotion_code] += len(sentence)
        total_len += len(sentence)

    for i in range(7):
        emotion_results[i] /= total_len

    analyzed = Emotion()
    checksum = 0
    max_feature = {'feature': '', 'value': 0}
    for i, (feat, _) in enumerate(analyzed):
        setattr(analyzed, feat, round(10000 * emotion_results[i]))
        val = getattr(analyzed, feat)
        if val > max_feature['value']:
            max_feature['feature'] = feat
            max_feature['value'] = val
        checksum += val

    while checksum != 10000:
        if checksum < 10000:
            setattr(analyzed, max_feature['feature'], max_feature['value'] + 1)
            checksum += 1
        elif checksum > 10000:
            setattr(analyzed, max_feature['feature'], max_feature['value'] - 1)
            checksum -= 1

    return analyzed
