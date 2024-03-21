package com.ssafy.daumnal.diary.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class DiaryDTO {

    @Getter
    public static class DiaryContentRequest {
        private String diaryTitle;
        private String diaryContent;
        private String diaryHashTag;
        private DiaryEmotion diaryEmotion;
    }

    @Getter
    public static class DiaryEmotion {
        private Integer fear;
        private Integer surprise;
        private Integer angry;
        private Integer sadness;
        private Integer neutral;
        private Integer happiness;
        private Integer disgust;
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

    public static class CalendarContent {
        private String emotionFirst;
        private String diaryHashTag;
        private String diaryId;
        private String musicId;
        private Integer diaryDay;
    }
}
