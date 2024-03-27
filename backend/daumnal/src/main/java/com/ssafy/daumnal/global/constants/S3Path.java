package com.ssafy.daumnal.global.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum S3Path {

    PLAYLIST_PATH("playlistCover"),
    DIARY_PHOTO_PATH("diaryPhoto");

    private final String name;
}