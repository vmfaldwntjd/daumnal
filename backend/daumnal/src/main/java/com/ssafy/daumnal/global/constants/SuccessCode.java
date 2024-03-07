package com.ssafy.daumnal.global.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.OK;

@AllArgsConstructor
@Getter
public enum SuccessCode {

    //일반
    UPLOAD_IMAGE(OK, "이미지 업로드 성공"),

    //일기
    UPLOAD_DIARY_PHOTO(OK, "일기 내용 중 사진 부분 업로드 성공");

    private final HttpStatus status;
    private final String message;
}