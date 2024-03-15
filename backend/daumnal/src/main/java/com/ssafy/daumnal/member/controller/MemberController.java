package com.ssafy.daumnal.member.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.*;
import com.ssafy.daumnal.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    /**
     * 로그인 API
     * @param loginMemberRequest
     * @return
     */
    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginMemberRequest loginMemberRequest) {
        GetMemberLoginResponse memberLoginResponse = memberService.login(loginMemberRequest.getSocialId(),
                loginMemberRequest.getSocialProvider());

        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_STATUS_LOGIN, memberLoginResponse);
    }

    /**
     * 닉네임 입력 API
     * 첫 로그인 진행 후의 단계입니다.
     * @param nicknameRequest
     * @return
     */
    @PostMapping("/nickname")
    public ApiResponse<?> addMemberNickname(@RequestBody AddMemberNicknameRequest nicknameRequest) {
        GetMemberLoginResponse memberLoginResponse = memberService.addMemberNickname(nicknameRequest.getMemberNickname());
        return ApiResponse.success(SuccessCode.CREATE_MEMBER_NICKNAME,memberLoginResponse);
    }
}