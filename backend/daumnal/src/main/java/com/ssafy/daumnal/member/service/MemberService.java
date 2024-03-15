package com.ssafy.daumnal.member.service;

import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberNicknameRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberLoginResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberResponse;

public interface MemberService {
    void addMember(AddMemberRequest accountDto);

    GetMemberLoginResponse addMemberNickname(String memberId, AddMemberNicknameRequest nicknameRequest);

    GetMemberResponse getMemberBySocialIdAndSocialProvider(String socialId, String socialProvider);

    GetMemberLoginResponse login(String socialId, String socialProvider);
}