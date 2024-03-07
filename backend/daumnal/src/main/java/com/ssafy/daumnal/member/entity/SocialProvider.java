package com.ssafy.daumnal.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SocialProvider {
    KAKAO("카카오"), NAVER("네이버");

    private String name;
}