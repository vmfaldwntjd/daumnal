package com.ssafy.daumnal.member.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
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
        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_STATUS_LOGIN,
                memberService.login(loginMemberRequest.getSocialId(),
                loginMemberRequest.getSocialProvider()));
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
        return ApiResponse.success(SuccessCode.CREATE_MEMBER_NICKNAME,
                memberService.addMemberNickname(jwtProvider.getMemberInfo(authentication),
                nicknameRequest.getMemberNickname()));
    }

    /**
     * jwt 재발급 API
     *
     * @param memberDetails
     * @return
     */
    @GetMapping("/reissue")
    public ApiResponse<?> getMemberAccessReIssueToken(@AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();
        return ApiResponse.success(SuccessCode.CREATE_REGENERATE_ACCESS_TOKEN,
                jwtProvider.reGenerateAccessToken(member.getId(), member.getSocialId(),
                member.getSocialProvider().getName()));
    }

    /**
     * 닉네임 정보 변경 API
     *
     * @param authentication
     * @param nicknameRequest
     * @return
     */
    @PatchMapping("/nickname")
    public ApiResponse<?> updateMemberNickname(Authentication authentication,
                                               @RequestBody AddMemberNicknameRequest nicknameRequest) {
        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_NICKNAME,
                memberService.modifyMemberNickname(jwtProvider.getMemberInfo(authentication),
                nicknameRequest.getMemberNickname()));
    }

    /**
     * 닉네임 정보 조회 API
     *
     * @param authentication
     * @return
     */
    @GetMapping("/nickname")
    public ApiResponse<?> getMemberNickname(Authentication authentication) {
        return ApiResponse.success(SuccessCode.GET_MEMBER_NICKNAME,
                memberService.getMemberNickname(jwtProvider.getMemberInfo(authentication)));
    }

    /**
     * 로그아웃 API
     *
     * @param authentication
     * @return
     */
    @PostMapping("/logout")
    public ApiResponse<?> logout(Authentication authentication) {
        memberService.modifyMemberStatusLogout(jwtProvider.getMemberInfo(authentication));
        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_LOGOUT);
    }

    /**
     * 회원 탈퇴 API
     *
     * @param authentication
     * @return
     */
    @DeleteMapping
    public ApiResponse<?> removeMember(Authentication authentication) {
        return ApiResponse.success(SuccessCode.UPDATE_MEMBER_STATUS_DELETE,
                memberService.modifyMemberStatusDelete(jwtProvider.getMemberInfo(authentication)));
    }
}