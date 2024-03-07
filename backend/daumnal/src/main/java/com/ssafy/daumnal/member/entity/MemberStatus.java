package com.ssafy.daumnal.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {
    DELETE(0), LOGIN(1), LOGOUT(2);

    private int value;
}