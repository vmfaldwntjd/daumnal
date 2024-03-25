package com.ssafy.daumnal.diary.dto;

import com.ssafy.daumnal.diary.dto.nativedto.CalendarContent;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.DiaryEmotion;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class DiaryDTO {

    @Getter
    @Setter
    public static class DiaryRequest {
        private String diaryTitle;
        private String diaryContent;
        private String diaryHashTag;
        private MultipartFile diaryPhoto;
        private DiaryEmotion diaryEmotion;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetDiaryWrittenTodayResponse {
        private boolean written;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class AddDiaryResponse {
        private String diaryId;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetCalendarResponse {
        List<CalendarContent> calendarContents;
    }
}
