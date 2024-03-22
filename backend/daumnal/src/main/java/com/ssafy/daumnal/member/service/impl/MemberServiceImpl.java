package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.global.dto.TokenResponse;
import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberLoginResponse;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberNicknameResponse;
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
    public GetMemberLoginResponse login(String socialId, String socialProvider) {


        memberUtilService.validateExistsSocialId(socialId);
        memberUtilService.validateExistsSocialProvider(socialProvider);
        memberUtilService.validateSocialIdNumber(socialId);
        memberUtilService.validateSocialProvider(socialProvider);

        return getGetMemberLoginResponse(socialId, socialProvider);
    }

    @Transactional
    @Override
    public GetMemberNicknameResponse addMemberNickname(String memberId, String nickname) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int memberStatus = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(memberStatus);
        memberUtilService.validateMemberStatusNotLogout(memberStatus);

        memberUtilService.validateInputMemberNickname(nickname);

        if (member.getNickname() != null || memberRepository.existsMemberByNickname(nickname)) {
            throw new ExistException(EXISTS_MEMBER_NICKNAME_STATUS);
        }

        member.updateNickname(nickname);

        return GetMemberNicknameResponse.builder()
                .memberId(memberId)
                .memberNickname(nickname)
                .build();
    }

    @Transactional
    @Override
    public GetMemberNicknameResponse modifyMemberNickname(String memberId, String nickname) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int memberStatus = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(memberStatus);
        memberUtilService.validateMemberStatusNotLogout(memberStatus);

        String originNickname = member.getNickname();
        memberUtilService.validateExistsInitialNickname(originNickname);

        memberUtilService.validateInputMemberNickname(nickname);
        memberUtilService.validateNicknameEqualInit(nickname, originNickname);

        if (member.getNickname() != null && memberRepository.existsMemberByNickname(nickname)) {
            throw new ExistException(EXISTS_MEMBER_NICKNAME_STATUS);
        }

        member.updateNickname(nickname);

        return GetMemberNicknameResponse.builder()
                .memberId(memberId)
                .memberNickname(nickname)
                .build();
    }

    @Override
    public GetMemberNicknameResponse getMemberNickname(String memberId) {
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateNicknameEmpty(member.getNickname());

        return GetMemberNicknameResponse.builder()
                .memberId(memberId)
                .memberNickname(member.getNickname())
                .build();
    }

    @Transactional
    @Override
    public void modifyMemberStatusLogout(String memberId) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        member.updateMemberStatus(MemberStatus.LOGOUT);
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
                    .memberId(String.valueOf(member.getId()))
                    .memberAccessToken(tokenResponse.getAccessToken())
                    .memberRefreshToken(tokenResponse.getRefreshToken())
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
                    .memberId(String.valueOf(member.getId()))
                    .memberAccessToken(tokenResponse.getAccessToken())
                    .memberRefreshToken(tokenResponse.getRefreshToken())
                    .firstLogin(false)
                    .build();
        }
    }
}