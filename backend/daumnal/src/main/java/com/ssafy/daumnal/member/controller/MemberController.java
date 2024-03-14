package com.ssafy.daumnal.member.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.*;
import com.ssafy.daumnal.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/register")
    public ApiResponse<?> addMember(@RequestBody AddMemberRequest addMemberRequest) {
        memberService.addMember(addMemberRequest);
        return ApiResponse.success(SuccessCode.CREATE_MEMBER);
    }

    @PostMapping("/{memberId}/nickname")
    public ApiResponse<?> addMemberNickname(@PathVariable String memberId,
                                            @RequestBody AddMemberNicknameRequest nicknameRequest) {
        GetMemberLoginResponse memberLoginResponse = memberService.addMemberNickname(memberId, nicknameRequest);
        return ApiResponse.success(SuccessCode.CREATE_MEMBER_NICKNAME,memberLoginResponse);
    }

    @GetMapping
    public ApiResponse<?> getMemberBySocialIdAndSocialProvider(@RequestParam String socialId,
                                    @RequestParam String socialProvider) {
        GetMemberResponse memberResponse = memberService.getMemberBySocialIdAndSocialProvider(socialId, socialProvider);
        return ApiResponse.success(SuccessCode.GET_MEMBER, memberResponse);
    }

    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody LoginMemberRequest loginMemberRequest) {
        GetMemberLoginResponse memberLoginResponse = memberService.updateMemberStatusLogin(loginMemberRequest.getSocialId(),
                loginMemberRequest.getSocialProvider());

        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_STATUS_LOGIN, memberLoginResponse);
    }
}