package com.ssafy.daumnal.member.service;

import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberNicknameRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberResponse;

public interface MemberService {
    void addMember(AddMemberRequest accountDto);

    void addMemberNickname(String memberId, AddMemberNicknameRequest nicknameRequest);

    GetMemberResponse getMemberBySocialIdAndSocialProvider(String socialId, String socialProvider);
}