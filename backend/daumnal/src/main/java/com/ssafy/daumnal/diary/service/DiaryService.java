package com.ssafy.daumnal.diary.service;

import com.ssafy.daumnal.diary.dto.DiaryDTO;
import com.ssafy.daumnal.diary.dto.DiaryDTO.DiaryEmotion;
import org.springframework.web.multipart.MultipartFile;

public interface DiaryService {
    DiaryDTO.GetDiaryWrittenTodayResponse getDiaryWritten(String memberId);

    void addDiary(String memberId, String diaryTitle, String diaryContent, String diaryHashTag,
                  MultipartFile diaryPhoto, DiaryEmotion diaryEmotion);
}