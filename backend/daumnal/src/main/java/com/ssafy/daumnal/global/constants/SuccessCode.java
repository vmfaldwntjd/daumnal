package com.ssafy.daumnal.global.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum SuccessCode {

    //일반
    UPLOAD_IMAGE(CREATED, "이미지 업로드 성공"),

    //회원
    CREATE_MEMBER(CREATED, "회원 정보 등록에 성공하였습니다!"),
    CREATE_REGENERATE_ACCESS_TOKEN(CREATED, "access token 재발급에 성공하였습니다"),
    CREATE_MEMBER_NICKNAME(CREATED, "닉네임 정보 입력에 성공하였습니다!"),
    GET_MEMBER(OK, "회원 정보 조회에 성공하였습니다!"),
    GET_MEMBER_NICKNAME(OK, "닉네임 조회에 성공하였습니다!"),
    UPDATE_MEMBER_NICKNAME(OK, "닉네임 정보 변경에 성공하였습니다!"),
    UPDATE_MEMBER_LOGOUT(OK, "로그아웃에 성공하였습니다!"),
    UPDATE_MEMBER_STATUS_DELETE(OK, "회원 탈퇴 처리를 완료하였습니다!"),
    UPDATE_MEMBER_STATUS_LOGIN(OK, "로그인에 성공하였습니다!"),

    //일기
    UPLOAD_DIARY_PHOTO(CREATED, "일기 내용 중 사진 업로드 성공"),
    UPLOAD_PLAYLIST_COVER(CREATED, "플레이리스트 커버 업로드 성공"),
    CREATE_DIARY(OK, "일기 입력에 성공하였습니다!"),
    GET_DIARY(CREATED, "선택한 일기 정보 조회에 성공하였습니다!"),
    GET_DIARY_STATUS(OK, "일기 작성 여부 결과를 성공적으로 가져왔습니다!"),
    GET_DIARY_MONTH_EMOTION(OK, "월별 일기 감정 정보 조회에 성공하였습니다!"),
    GET_DIARY_DAY_EMOTION(OK, "일기의 감정 정보 조회에 성공하였습니다!"),
    GET_DIARY_CALENDAR(OK, "캘린더 정보 조회에 성공하였습니다!"),
    UPDATE_TODAY_RECOMMENDED_MUSIC(OK, "오늘 작성한 일기에서 추천된 노래를 추가하는데 성공했습니다!"),
    DELETE_DIARY(OK, "일기 삭제를 완료하였습니다!"),

    //음악
    GET_BACKGROUND_MUSICS(OK, "배경 음악 정보 조회에 성공하였습니다!"),
    GET_BACKGROUND_MUSIC(OK, "선택한 배경 음악 정보 조회에 성공하였습니다!"),
    GET_EMPTY_PLAYLISTS(NO_CONTENT, "플레이리스트 목록을 조회하는데 성공했지만, 저장된 플레이리스트 데이터가 없습니다!"),
    GET_PLAYLISTS(OK, "플레이리스트 목록을 조회하는데 성공했습니다!"),
    GET_MUSICS_IN_PLAYLIST(OK, "플레이리스트의 노래 리스트를 조회하는데 성공했습니다!"),
    UPDATE_BACKGROUND_MUSIC(OK, "배경 음악 정보를 변경 완료하였습니다!"),
    CREATE_PLAYLIST(CREATED, "플레이리스트를 생성하는데 성공했습니다!"),
    ADD_MUSIC_TO_PLAYLIST(CREATED, "플레이리스트에 노래를 추가하는데 성공했습니다!");

    private final HttpStatus status;
    private final String message;
}