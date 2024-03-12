package com.ssafy.daumnal.member.dto;

import lombok.Getter;

public class MemberDTO {

    @Getter
    public static class AddMemberRequest {
        private String socialId;
        private String socialProvider;
    }
}
