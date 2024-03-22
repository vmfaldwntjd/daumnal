package com.ssafy.daumnal.emotion.dto;

import lombok.Getter;
import lombok.Setter;

public class EmotionDTO {

    @Getter
    @Setter
    public static class DiaryEmotion {
        private String fear;
        private String surprise;
        private String angry;
        private String sadness;
        private String neutral;
        private String happiness;
        private String disgust;
    }
}
