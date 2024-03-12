package com.ssafy.daumnal.member.service;

import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;

public interface MemberService {
    void addMember(AddMemberRequest accountDto);
}