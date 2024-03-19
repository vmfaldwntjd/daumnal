package com.ssafy.daumnal.global.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenMemberDTO {

    private final Long memberId;
    private final Long memberSocialId;
    private final String memberSocialProvider;
    private final String type;

    public static TokenMemberDTO accessToken(Long memberId, Long memberSocialId,
                                             String memberSocialProvider) {
        return new TokenMemberDTO(memberId, memberSocialId, memberSocialProvider, "access");
    }

    public static TokenMemberDTO refreshToken(Long memberId, Long memberSocialId,
                                             String memberSocialProvider) {
        return new TokenMemberDTO(memberId, memberSocialId, memberSocialProvider, "refresh");
    }
}
