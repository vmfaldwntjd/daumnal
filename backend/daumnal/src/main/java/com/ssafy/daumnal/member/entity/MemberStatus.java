package com.ssafy.daumnal.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {
    DELETE(0, "회원 탈퇴 상태"), LOGIN(1, "로그인 상태"), LOGOUT(2, "로그아웃 상태");

    private int value;
    private String name;
}