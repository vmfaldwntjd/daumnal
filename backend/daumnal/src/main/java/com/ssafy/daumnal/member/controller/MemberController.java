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
     * 회원가입 API
     * @param addMemberRequest
     * @return
     */
    @PostMapping("/register")
    public ApiResponse<?> addMember(@RequestBody AddMemberRequest addMemberRequest) {
        memberService.addMember(addMemberRequest);
        return ApiResponse.success(SuccessCode.CREATE_MEMBER);
    }

    /**
     * 닉네임 입력 API
     * 회원가입 진행 후의 단계입니다.
     * @param memberId
     * @param nicknameRequest
     * @return
     */
    @PostMapping("/{memberId}/nickname")
    public ApiResponse<?> addMemberNickname(@PathVariable String memberId,
                                            @RequestBody AddMemberNicknameRequest nicknameRequest) {
        GetMemberLoginResponse memberLoginResponse = memberService.addMemberNickname(memberId, nicknameRequest);
        return ApiResponse.success(SuccessCode.CREATE_MEMBER_NICKNAME,memberLoginResponse);
    }

    /**
     * 특정 회원 정보 조회 API
     * @param socialId
     * @param socialProvider
     * @return
     */
    @GetMapping
    public ApiResponse<?> getMemberBySocialIdAndSocialProvider(@RequestParam String socialId,
                                    @RequestParam String socialProvider) {
        GetMemberResponse memberResponse = memberService.getMemberBySocialIdAndSocialProvider(socialId, socialProvider);
        return ApiResponse.success(SuccessCode.GET_MEMBER, memberResponse);
    }

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
}