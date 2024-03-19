package com.ssafy.daumnal.diary.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

public class DiaryDTO {

    @Getter
    public static class DiaryRequest {
        private String diaryTitle;
        private String diaryContent;
        private String diaryHashTag;
        private MultipartFile diaryPhoto;
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
}
