package com.ssafy.daumnal.diary.service;

import com.ssafy.daumnal.diary.dto.DiaryDTO;
import com.ssafy.daumnal.diary.dto.DiaryDTO.GetCalendarResponse;
import com.ssafy.daumnal.diary.dto.DiaryDTO.GetDiaryResponse;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.DiaryEmotion;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.GetAllEmotionByMonth;
import org.springframework.web.multipart.MultipartFile;

public interface DiaryService {
    DiaryDTO.GetDiaryWrittenTodayResponse getDiaryWritten(String memberId);

    DiaryDTO.AddDiaryResponse addDiary(String memberId, String diaryTitle, String diaryContent, String diaryHashTag,
                                       MultipartFile diaryPhoto, DiaryEmotion diaryEmotion);

    GetCalendarResponse getCalendar(String memberId, String year, String month);

    void addTodayRecommendedMusic(String memberId, Long diaryId, Long musicId);

    GetDiaryResponse getDiary(String memberId, String diaryId);

    GetAllEmotionByMonth getAllEmotionByMonth(String memberId, String year, String month);

    DiaryEmotion getEmotionByDay(String memberId, String emotionId);
}