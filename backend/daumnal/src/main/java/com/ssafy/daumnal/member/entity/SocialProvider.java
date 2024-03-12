package com.ssafy.daumnal.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SocialProvider {
    KAKAO("kakao"), NAVER("naver");

    private String name;
}