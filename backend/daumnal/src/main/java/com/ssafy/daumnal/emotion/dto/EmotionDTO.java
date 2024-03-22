package com.ssafy.daumnal.emotion.dto;

import lombok.Getter;
import lombok.Setter;

public class EmotionDTO {

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
