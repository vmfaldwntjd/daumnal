package com.ssafy.daumnal.global.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@Getter
public enum SuccessCode {

    //일반
    UPLOAD_IMAGE(CREATED, "이미지 업로드 성공"),

    //일기
    UPLOAD_DIARY_PHOTO(CREATED, "일기 내용 중 사진 업로드 성공"),
    UPLOAD_PLAYLIST_COVER(CREATED, "플레이리스트 커버 업로드 성공");

    private final HttpStatus status;
    private final String message;
}