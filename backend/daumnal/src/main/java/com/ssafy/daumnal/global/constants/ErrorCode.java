package com.ssafy.daumnal.global.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    //일반
    NOT_EXISTS_ID(BAD_REQUEST, "존재하지 않는 id 입니다."),

    //회원
    EXISTS_MEMBER(BAD_REQUEST, "존재한 회원입니다!"),
    EXISTS_MEMBER_NICKNAME_STATUS(BAD_REQUEST, "이미 존재한 닉네임입니다!"),

    NOT_EXISTS_MEMBER_ID(BAD_REQUEST, "존재하지 않는 회원 id 입니다."),
    NOT_EXISTS_MEMBER_REFRESH(NOT_FOUND, "refresh 토큰이 만료되었습니다!"),
    NOT_EXISTS_MEMBER(NOT_FOUND, "존재하지 않는 회원입니다!"),
    NOT_EXISTS_MEMBER_SOCIAL_ID(BAD_REQUEST, "socialId를 입력해주세요!"),
    NOT_EXISTS_MEMBER_SOCIAL_PROVIDER(BAD_REQUEST, "socialProvider를 입력해주세요!"),
    NOT_EXISTS_MEMBER_NICKNAME_INPUT(BAD_REQUEST, "닉네임을 입력해주세요!"),
    NOT_EXISTS_MEMBER_NICKNAME_GET(BAD_REQUEST, "닉네임 정보가 없습니다!"),
    NOT_EXISTS_MEMBER_NICKNAME_INIT_GET(BAD_REQUEST, "초기에 닉네임을 등록하지 않은 회원입니다!"),

    INVALID_MEMBER_ID(BAD_REQUEST, "회원 id 입력 형식이 올바르지 않습니다!"),
    INVALID_MEMBER_TOKEN(FORBIDDEN, "유효하지 않는 토큰입니다!"),
    INVALID_MEMBER_SOCIAL_ID(BAD_REQUEST, "socialId의 입력 형식이 올바르지 않습니다!"),
    INVALID_MEMBER_SOCIAL_PROVIDER(BAD_REQUEST, "올바른 socialProvider를 입력해주세요!"),
    INVALID_MEMBER_NICKNAME_WORDS(BAD_REQUEST, "닉네임 입력시 한글 또는 영어로 입력해주세요!"),
    INVALID_MEMBER_NICKNAME_LENGTH(BAD_REQUEST, "닉네임 입력 길이는 15자 이하로 입력 바랍니다!"),
    INVALID_MEMBER_NICKNAME_SPACE(BAD_REQUEST, "닉네임 입력시 공백 없이 입력해주세요!"),
    INVALID_MEMBER_STATUS_ON_LOGOUT(FORBIDDEN, "해당 회원은 로그아웃 한 상태입니다!"),
    INVALID_MEMBER_STATUS_ON_DELETE(FORBIDDEN, "해당 회원은 탈퇴 처리된 회원입니다!"),
    INVALID_MEMBER_STATUS_ON_LOGIN(FORBIDDEN, "해당 회원은 이미 로그인 한 상태입니다!"),

    // 일기
    NOT_EXISTS_DIARY(NOT_FOUND, "선택한 일기는 존재하지 않습니다!"),
    NOT_EXISTS_DIARY_EMOTION_ID(NOT_FOUND, "해당 감정에 대한 정보가 존재하지 않습니다!"),
    NOT_EXISTS_DIARY_TITLE_INPUT(BAD_REQUEST, "일기 제목을 입력해주세요!"),
    NOT_EXISTS_DIARY_CONTENT_INPUT(BAD_REQUEST, "일기 내용을 입력해주세요!"),
    NOT_EXISTS_DIARY_EMOTION_INPUT(BAD_REQUEST, "감정 정보를 전부 입력하지 않았습니다!"),
    NOT_EXISTS_DIARY_YEAR_INPUT(BAD_REQUEST, "year 정보를 요청받지 못하였습니다!"),
    NOT_EXISTS_DIARY_MONTH_INPUT(BAD_REQUEST, "month 정보를 요청받지 못하였습니다!"),

    INVALID_DIARY_ID(BAD_REQUEST, "일기 id 입력 형식이 올바르지 않습니다!"),
    INVALID_DIARY_EMOTION_ID(BAD_REQUEST, "감정 id 입력 형식이 올바르지 않습니다!"),
    INVALID_DIARY_CONTENT_LENGTH(BAD_REQUEST, "일기 내용은 3000자 이하로 작성해주세요!"),
    INVALID_DIARY_HASHTAG_LENGTH(BAD_REQUEST, "해시태그의 글자수는 10자 이하여야 합니다!"),
    INVALID_DIARY_HASHTAG_WORDS(BAD_REQUEST, "해시태그의 입력 방법이 올바르지 않습니다!"),
    INVALID_DIARY_HASHTAG_COUNT(BAD_REQUEST, "해시태그의 개수는 3개 이하여야 합니다!"),
    INVALID_DIARY_YEAR_INPUT(BAD_REQUEST, "year 정보의 입력 형식이 올바르지 않습니다!"),
    INVALID_DIARY_MONTH_INPUT(BAD_REQUEST, "month 정보의 입력 형식이 올바르지 않습니다!"),

    //음악
    NOT_EXISTS_BACKGROUND_MUSIC(NOT_FOUND, "존재하지 않는 배경음악입니다!"),

    INVALID_BACKGROUND_MUSIC_ID(BAD_REQUEST, "배경음악 id 입력 형식이 올바르지 않습니다!"),

    //파일
    NOT_EXISTS_FILE(BAD_REQUEST, "존재하지 않는 파일입니다.");

    private final HttpStatus status;
    private final String message;
}