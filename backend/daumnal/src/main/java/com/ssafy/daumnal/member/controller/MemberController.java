package com.ssafy.daumnal.member.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.dto.TokenRegenerateResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.global.util.MemberDetails;
import com.ssafy.daumnal.member.dto.MemberDTO.*;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;

    /**
     * 로그인 API
     *
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
     *
     * @param nicknameRequest
     * @return
     */
    @PostMapping("/nickname")
    public ApiResponse<?> addMemberNickname(Authentication authentication,
                                            @RequestBody AddMemberNicknameRequest nicknameRequest) {
        String memberId = jwtProvider.getAccessToken(authentication);
        GetMemberNicknameResponse memberNicknameResponse = memberService.addMemberNickname(memberId, nicknameRequest.getMemberNickname());
        return ApiResponse.success(SuccessCode.CREATE_MEMBER_NICKNAME, memberNicknameResponse);
    }

    /**
     * jwt 재발급 API
     * @param memberDetails
     * @return
     */
    @GetMapping("/reissue")
    public ApiResponse<?> getMemberAccessReIssueToken(@AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();
        TokenRegenerateResponse tokenRegenerateResponse = jwtProvider.reGenerateAccessToken(member.getId(), member.getSocialId(),
                member.getSocialProvider().getName());
        return ApiResponse.success(SuccessCode.CREATE_REGENERATE_ACCESS_TOKEN, tokenRegenerateResponse);
    }

    @PatchMapping("/nickname")
    public ApiResponse<?> updateMemberNickname(Authentication authentication,
                                            @RequestBody AddMemberNicknameRequest nicknameRequest) {
        String memberId = jwtProvider.getAccessToken(authentication);
        GetMemberNicknameResponse memberNicknameResponse = memberService.modifyMemberNickname(memberId, nicknameRequest.getMemberNickname());
        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_NICKNAME, memberNicknameResponse);
    }
}