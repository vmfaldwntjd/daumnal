package com.ssafy.daumnal.diary.service;

import com.ssafy.daumnal.diary.dto.DiaryDTO;

public interface DiaryService {
    DiaryDTO.GetDiaryWrittenTodayResponse getDiaryWritten(String memberId);
}