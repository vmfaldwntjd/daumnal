package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.global.dto.TokenResponse;
import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberNicknameRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberLoginResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberResponse;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.entity.MemberStatus;
import com.ssafy.daumnal.member.entity.SocialProvider;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.service.MemberService;
import com.ssafy.daumnal.member.util.MemberUtilService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.member.constants.MemberConstants.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;
    private final MemberUtilService memberUtilService;

    @Transactional
    @Override
    public void addMember(AddMemberRequest addMemberRequest) {

        String socialId = addMemberRequest.getSocialId();
        String socialProvider = addMemberRequest.getSocialProvider();

        memberUtilService.validateExistsSocialId(socialId);
        memberUtilService.validateSocialIdNumber(socialId);
        memberUtilService.validateExistsSocialProvider(socialProvider);
        memberUtilService.validateSocialProvider(socialProvider);

        SocialProvider provider = getProvider(socialProvider);

        if (memberRepository.existsMemberBySocialIdAndSocialProvider(
                Long.parseLong(socialId),
                provider)) {
            throw new ExistException(EXISTS_MEMBER);
        }

        Member member = Member.builder()
                .socialId(Long.parseLong(socialId))
                .socialProvider(provider)
                .build();

        memberRepository.save(member);
    }

    @Transactional
    @Override
    public GetMemberLoginResponse addMemberNickname(String memberId,
                                                    AddMemberNicknameRequest nicknameRequest) {
        memberUtilService.validateMemberIdNumber(memberId);

        // 회원 pk 찾아오기 -> 존재하지 않으면 예외처리
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int memberStatus = member.getStatus().getValue();
        memberUtilService.validateMemberStatusLogin(memberStatus);

        String nickname = nicknameRequest.getMemberNickname();
        memberUtilService.validateInputMemberNickname(nickname);

        // 이미 존재한 닉네임을 입력하는 경우
        if (member.getNickname() != null && memberRepository.existsMemberByNickname(nickname)) {
            throw new ExistException(EXISTS_MEMBER_NICKNAME_STATUS);
        }

        member.updateNickname(nickname);

        // access token 생성하기
        TokenResponse tokenResponse = jwtProvider.generateToken(member.getId(), member.getSocialId(),
                member.getSocialProvider().getName(), member.getNickname());

        return GetMemberLoginResponse.builder()
                .memberNickname(nickname)
                .memberAccessToken(tokenResponse.getAccessToken())
                .build();
    }

    @Override
    public GetMemberResponse getMemberBySocialIdAndSocialProvider(String socialId,
                                                                  String socialProvider) {

        memberUtilService.validateExistsSocialId(socialId);
        memberUtilService.validateExistsSocialProvider(socialProvider);
        memberUtilService.validateSocialIdNumber(socialId);
        memberUtilService.validateSocialProvider(socialProvider);

        Member member = memberRepository.findMemberBySocialIdAndSocialProvider(Long.parseLong(socialId), getProvider(socialProvider))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER));

        return GetMemberResponse.builder()
                .memberId(member.getId())
                .socialId(member.getSocialId())
                .socialProvider(member.getSocialProvider().getName())
                .memberNickname(member.getNickname())
                .build();
    }

    @Transactional
    @Override
    public GetMemberLoginResponse updateMemberStatusLogin(String socialId, String socialProvider) {

        if (socialId == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_ID);
        }

        if (socialProvider == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_PROVIDER);
        }

        if (!socialId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_ID);
        }

        if (!(KAKAO.equals(socialProvider) || NAVER.equals(socialProvider))) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_PROVIDER);
        }

        Member member = memberRepository.findMemberBySocialIdAndSocialProvider(Long.parseLong(socialId),
                        getProvider(socialProvider))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER));

        if (member.getStatus() == MemberStatus.DELETE) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_DELETE);
        }

        if (member.getStatus() == MemberStatus.LOGIN) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_LOGIN);
        }

        member.updateMemberStatus(MemberStatus.LOGIN);

        // access token 발급해주기
        TokenResponse tokenResponse = jwtProvider.generateToken(member.getId(),
                Long.parseLong(socialId), socialProvider, member.getNickname());

        return GetMemberLoginResponse.builder()
                .memberNickname(member.getNickname())
                .memberAccessToken(tokenResponse.getAccessToken())
                .build();
    }

    private SocialProvider getProvider(String socialProvider) {

        SocialProvider providerResult = null;

        if (socialProvider.equals(KAKAO)) {
            providerResult = SocialProvider.KAKAO;
        } else if (socialProvider.equals(NAVER)) {
            providerResult = SocialProvider.NAVER;
        }

        return providerResult;
    }
}