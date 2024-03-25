package com.ssafy.daumnal.emotion.dto;

import com.ssafy.daumnal.emotion.dto.nativedto.GetEmotionByMonth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class EmotionDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetAllEmotionByMonth {
        List<GetEmotionByMonth> diaryEmotions;
    }

    @Getter
    @Setter
    public static class DiaryEmotion {
        private Integer fear;
        private Integer surprise;
        private Integer angry;
        private Integer sadness;
        private Integer neutral;
        private Integer happiness;
        private Integer disgust;
    }
}
