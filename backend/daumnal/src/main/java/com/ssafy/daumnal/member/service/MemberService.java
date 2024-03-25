package com.ssafy.daumnal.member.service;

import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberLoginResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberNicknameResponse;

public interface MemberService {
    GetMemberNicknameResponse addMemberNickname(String memberId, String nickname);
    GetMemberLoginResponse login(String socialId, String socialProvider);

    GetMemberNicknameResponse modifyMemberNickname(String memberId, String memberNickname);

    GetMemberNicknameResponse getMemberNickname(String memberId);

    void modifyMemberStatusLogout(String memberId);

    GetMemberNicknameResponse modifyMemberStatusDelete(String memberId);
}