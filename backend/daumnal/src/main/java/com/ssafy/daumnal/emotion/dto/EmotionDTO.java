package com.ssafy.daumnal.emotion.dto;

import com.ssafy.daumnal.emotion.dto.nativedto.GetEmotionByMonth;
import com.ssafy.daumnal.emotion.entity.Emotion;
import lombok.*;

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
    @AllArgsConstructor
    @Builder
    @NoArgsConstructor
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
    public static class MusicEmotion {
        private Integer fear;
        private Integer surprise;
        private Integer angry;
        private Integer sadness;
        private Integer neutral;
        private Integer happiness;
        private Integer disgust;

        public Emotion toEntity() {
            return Emotion.builder()
                    .fear(fear)
                    .surprise(surprise)
                    .angry(angry)
                    .sadness(sadness)
                    .neutral(neutral)
                    .happiness(happiness)
                    .disgust(disgust)
                    .build();
        }
    }
}
