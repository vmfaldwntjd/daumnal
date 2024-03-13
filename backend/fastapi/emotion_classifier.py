import torch
from torch import nn
from torch.utils.data import Dataset
import gluonnlp as nlp
import numpy as np

from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel

from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup

from pydantic import BaseModel
import pandas as pd

# train & test 데이터로 나누기
from sklearn.model_selection import train_test_split


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


class Init:
    def __init__(self):
        self.device = torch.device("cuda:0")
        self.tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
        self.bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
        self.vocab = nlp.vocab.BERTVocab.from_sentencepiece(self.tokenizer.vocab_file, padding_token='[PAD]')

        # [AI Hub] 감정 분류를 위한 대화 음성 데이터셋
        self.chatbot_data = pd.read_excel("한국어_단발성_대화_데이터셋.xlsx")

        self.chatbot_data.sample(n=10)
        # 7개의 감정 class → 숫자
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "공포"), 'Emotion'] = 0  # 공포 => 0
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "놀람"), 'Emotion'] = 1  # 놀람 => 1
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "분노"), 'Emotion'] = 2  # 분노 => 2
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "슬픔"), 'Emotion'] = 3  # 슬픔 => 3
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "중립"), 'Emotion'] = 4  # 중립 => 4
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "행복"), 'Emotion'] = 5  # 행복 => 5
        self.chatbot_data.loc[(self.chatbot_data['Emotion'] == "혐오"), 'Emotion'] = 6  # 혐오 => 6

        self.data_list = []
        for q, label in zip(self.chatbot_data['Sentence'], self.chatbot_data['Emotion']):
            data = [q, str(label)]

            self.data_list.append(data)

        # print(data)
        # print(data_list[:10])

        self.dataset_train, self.dataset_test = train_test_split(self.data_list, test_size=0.2, shuffle=True,
                                                                 random_state=32)

        self.tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
        self.tok = nlp.data.BERTSPTokenizer(self.tokenizer, self.vocab, lower=False)

        self.max_len = 64
        self.batch_size = 64
        self.warmup_ratio = 0.1
        self.num_epochs = 5
        self.max_grad_norm = 1
        self.log_interval = 200
        self.learning_rate = 5e-5

        # BERTDataset : 각 데이터가 BERT 모델의 입력으로 들어갈 수 있도록 tokenization, int encoding, padding하는 함수
        self.tok = self.tokenizer.tokenize

        self.data_train = BERTDataset(self.dataset_train, 0, 1, self.tok, self.vocab, self.max_len, True, False)
        self.data_test = BERTDataset(self.dataset_test, 0, 1, self.tok, self.vocab, self.max_len, True, False)

        # torch 형식의 dataset을 만들어 입력 데이터셋의 전처리 마무리
        self.train_dataloader = torch.utils.data.DataLoader(self.data_train, batch_size=self.batch_size, num_workers=5)
        self.test_dataloader = torch.utils.data.DataLoader(self.data_test, batch_size=self.batch_size, num_workers=5)

        # BERT  모델 불러오기
        # model = BERTClassifier(bertmodel, dr_rate=0.5).to(device)
        self.model = BERTClassifier(self.bertmodel, dr_rate=0.5)

        # optimizer와 schedule 설정
        # Prepare optimizer and schedule (linear warmup and decay)
        self.no_decay = ['bias', 'LayerNorm.weight']
        self.optimizer_grouped_parameters = [
            {'params': [p for n, p in self.model.named_parameters() if not any(nd in n for nd in self.no_decay)],
             'weight_decay': 0.01},
            {'params': [p for n, p in self.model.named_parameters() if any(nd in n for nd in self.no_decay)],
             'weight_decay': 0.0}
        ]

        self.optimizer = AdamW(self.optimizer_grouped_parameters, lr=self.learning_rate)
        loss_fn = nn.CrossEntropyLoss()  # 다중분류를 위한 loss function

        self.t_total = len(self.train_dataloader) * self.num_epochs
        self.warmup_step = int(self.t_total * self.warmup_ratio)

        self.scheduler = get_cosine_schedule_with_warmup(self.optimizer, num_warmup_steps=self.warmup_step,
                                                         num_training_steps=self.t_total)

        # calc_accuracy : 정확도 측정을 위한 함수
        def calc_accuracy(X, Y):
            max_vals, max_indices = torch.max(X, 1)
            train_acc = (max_indices == Y).sum().data.cpu().numpy() / max_indices.size()[0]
            return train_acc

        self.train_dataloader

        self.model.load_state_dict(torch.load("trained_params.pt", map_location=torch.device('cpu')))


def predict(predict_sentence, initiated):  # input = 감정분류하고자 하는 sentence

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, initiated.tok, initiated.vocab, initiated.max_len, True,
                               False)  # 토큰화한 문장
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=initiated.batch_size,
                                                  num_workers=5)  # torch 형식 변환

    initiated.model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        # token_ids = token_ids.long().to(device)
        # segment_ids = segment_ids.long().to(device)
        #
        # valid_length = valid_length
        # label = label.long().to(device)

        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length = valid_length
        label = label.long()

        out = initiated.model(token_ids, valid_length, segment_ids)

        test_eval = []
        for i in out:  # out = model(token_ids, valid_length, segment_ids)
            logits = i
            logits = logits.detach().cpu().numpy()

            return np.argmax(logits)


class Emotion(BaseModel):
    fear: int = 0
    surprise: int = 0
    angry: int = 0
    sadness: int = 0
    neutral: int = 0
    happiness: int = 0
    disgust: int = 0


def analyze_init(diaryContent):
    sentences = diaryContent.split('.')
    del sentences[len(sentences) - 1]

    if len(sentences) < 3:
        return None

    emotion_results = [0] * 7
    total_len = 0

    initiated = Init()
    for sentence in sentences:
        emotion_code = predict(sentence, initiated)
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
        elif checksum > 10000:
            setattr(analyzed, max_feature['feature'], max_feature['value'] - 1)

    return analyzed
