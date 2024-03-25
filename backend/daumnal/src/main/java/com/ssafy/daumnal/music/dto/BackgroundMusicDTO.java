package com.ssafy.daumnal.music.dto;

import com.ssafy.daumnal.music.entity.BackgroundMusicCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class BackgroundMusicDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetBackgroundMusicResponse {
        private List<BackGroundMusic> backGroundMusics;
    }

    @Getter
    @AllArgsConstructor
    public static class BackGroundMusic {
        private String backgroundMusicId;
        private String backgroundMusicYoutubeId;
        private String backgroundMusicTitle;
        private BackgroundMusicCategory backgroundMusicCategory;
    }
}
