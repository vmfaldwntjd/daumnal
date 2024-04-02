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
    public static class RemoveDiaryResponse {
        private String diaryId;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetCalendarResponse {
        private List<CalendarContent> calendarContents;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetDiaryResponse {
        private String diaryTitle;
        private String diaryContent;
        private String diaryHashTag;
        private String diaryPhotoUrl;
        private String musicId;
        private String emotionId;
        private String diaryCreatedAt;
    }

    @Getter
    @Setter
    public static class AddFavoriteLyrics {
        private int[] diaryLyricsLineNumbers;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetLyricsOfTodayRecommendedMusic {
        private String musicLyrics;
        private int[] diaryLyricsLineNumbers;
    }
}
