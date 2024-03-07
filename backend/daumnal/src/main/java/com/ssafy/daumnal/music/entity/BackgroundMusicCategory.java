package com.ssafy.daumnal.music.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BackgroundMusicCategory {
    MUSIC("배경음악"), EFFECT("효과음");

    private String name;
}