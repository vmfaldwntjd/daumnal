package com.ssafy.daumnal.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class MemberDTO {

    @Getter
    public static class AddMemberNicknameRequest {
        private String memberNickname;
    }

    @Getter
    public static class LoginMemberRequest {
        private String socialId;
        private String socialProvider;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetMemberLoginResponse {
        private String memberId;
        private String memberAccessToken;
        private String memberRefreshToken;
        private Boolean firstLogin;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GetMemberNicknameResponse {
        private String memberId;
        private String memberNickname;
    }
}
