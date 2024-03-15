package com.ssafy.daumnal.member.service;

import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberNicknameRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberLoginResponse;

public interface MemberService {
    GetMemberLoginResponse addMemberNickname(String memberId, AddMemberNicknameRequest nicknameRequest);
    GetMemberLoginResponse login(String socialId, String socialProvider);
}