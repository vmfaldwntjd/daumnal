package com.ssafy.daumnal.music.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MusicCategory {
    SPRING("봄"), SUMMER("여름"), FALL("가을"), WINTER("겨울");

    private String name;
}