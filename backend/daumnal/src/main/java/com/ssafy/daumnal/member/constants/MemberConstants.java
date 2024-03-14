package com.ssafy.daumnal.member.constants;

public interface MemberConstants {

    String KAKAO = "kakao";
    String NAVER = "naver";
    String NUMBER_REGEX = "^[1-9]\\d*$";
    String KOREAN_REGEX = "^[가-힣]+$";
    String ENGLISH_REGEX = "^[a-zA-Z]+$";
    int MEMBER_DELETE = 0;
    int MEMBER_LOGOUT = 2;
    int NICKNAME_MAX_LENGTH = 15;
}
