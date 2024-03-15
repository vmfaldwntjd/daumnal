package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.global.dto.TokenResponse;
import com.ssafy.daumnal.global.exception.ExistException;
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

        SocialProvider provider = memberUtilService.getProvider(socialProvider);

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
        memberUtilService.validateMemberStatusNotDelete(memberStatus);
        memberUtilService.validateMemberStatusNotLogout(memberStatus);

        String nickname = nicknameRequest.getMemberNickname();
        memberUtilService.validateInputMemberNickname(nickname);

        // 이미 존재한 닉네임을 입력하는 경우
        if (member.getNickname() != null && memberRepository.existsMemberByNickname(nickname)) {
            throw new ExistException(EXISTS_MEMBER_NICKNAME_STATUS);
        }

        member.updateNickname(nickname);

        // access token 생성하기
        TokenResponse tokenResponse = jwtProvider.generateToken(member.getId(), member.getSocialId(),
                member.getSocialProvider().getName());

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

        Member member = memberRepository.findMemberBySocialIdAndSocialProvider(Long.parseLong(socialId),
                        memberUtilService.getProvider(socialProvider))
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
    public GetMemberLoginResponse login(String socialId, String socialProvider) {


        memberUtilService.validateExistsSocialId(socialId);
        memberUtilService.validateExistsSocialProvider(socialProvider);
        memberUtilService.validateSocialIdNumber(socialId);
        memberUtilService.validateSocialProvider(socialProvider);

        return getGetMemberLoginResponse(socialId, socialProvider);
    }

    private GetMemberLoginResponse getGetMemberLoginResponse(String socialId, String socialProvider) {

        SocialProvider provider = memberUtilService.getProvider(socialProvider);

        if (!memberRepository.existsMemberBySocialIdAndSocialProvider(
                Long.parseLong(socialId),
                provider)) {
            Member member = Member.builder()
                    .socialId(Long.parseLong(socialId))
                    .socialProvider(provider)
                    .build();

            memberRepository.save(member);
            TokenResponse tokenResponse = jwtProvider.generateToken(member.getId(),
                    Long.parseLong(socialId), socialProvider);

            return GetMemberLoginResponse.builder()
                    .memberNickname(member.getNickname())
                    .memberAccessToken(tokenResponse.getAccessToken())
                    .firstLogin(true)
                    .build();

        } else {
            Member member = memberRepository.findMemberBySocialIdAndSocialProvider(Long.parseLong(socialId),
                            provider)
                    .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER));

            memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());
            memberUtilService.validateMemberStatusReLogin(member.getStatus().getValue());

            member.updateMemberStatus(MemberStatus.LOGIN);

            TokenResponse tokenResponse = jwtProvider.generateToken(member.getId(),
                    Long.parseLong(socialId), socialProvider);

            return GetMemberLoginResponse.builder()
                    .memberNickname(member.getNickname())
                    .memberAccessToken(tokenResponse.getAccessToken())
                    .firstLogin(false)
                    .build();
        }
    }
}