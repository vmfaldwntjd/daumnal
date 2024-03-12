package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberNicknameRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
import com.ssafy.daumnal.member.dto.MemberDTO.GetMemberResponse;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.entity.SocialProvider;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final String KAKAO = "kakao";
    private static final String NAVER = "naver";
    private static final String NUMBER_REGEX = "^[1-9]\\d*$";
    private static final String KOREAN_REGEX = "^[가-힣]+$";
    private static final String ENGLISH_REGEX = "^[a-zA-Z]+$";

    private static final int MEMBER_DELETE = 0;
    private static final int MEMBER_LOGOUT = 2;

    private static final int NICKNAME_MAX_LENGTH = 15;

    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void addMember(AddMemberRequest addMemberRequest) {

        String socialId = addMemberRequest.getSocialId();
        String socialProvider = addMemberRequest.getSocialProvider();

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
    public void addMemberNickname(String memberId, AddMemberNicknameRequest nicknameRequest) {
        // 회원 pk 입력이 올바른지 확인하기
        if (!memberId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_MEMBER_ID);
        }

        // 회원 pk 찾아오기 -> 존재하지 않으면 예외처리
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int memberStatus = member.getStatus().getValue();

        // 회원 상태 확인하기 -> 탈퇴된 회원인 경우
        if (memberStatus == MEMBER_DELETE) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_DELETE);
        }

        // 로그아웃 한 회원인 경우
        if (memberStatus == MEMBER_LOGOUT) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_LOGOUT);
        }

        String nickname = nicknameRequest.getMemberNickname();

        // 닉네임을 입력 안 한 경우
        if (nickname == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_NICKNAME_INPUT);
        }

        // 닉네임 입력이 한글 또는 영어가 아닌 경우
        if (!(nickname.matches(ENGLISH_REGEX) || nickname.matches(KOREAN_REGEX))) {
            throw new InvalidException(INVALID_MEMBER_NICKNAME_WORDS);
        }

        // 닉네임 입력 길이가 15자가 넘어가버린 경우
        if (nickname.length() > NICKNAME_MAX_LENGTH) {
            throw new InvalidException(INVALID_MEMBER_NICKNAME_LENGTH);
        }

        // 이미 존재한 닉네임을 입력하는 경우
        if (member.getNickname() != null && memberRepository.existsMemberByNickname(nickname)) {
            throw new ExistException(EXISTS_MEMBER_NICKNAME_STATUS);
        }

        member.updateNickname(nickname);
    }

    @Override
    public GetMemberResponse getMemberBySocialIdAndSocialProvider(String socialId,
                                                                  String socialProvider) {

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

        Member member = memberRepository.findMemberBySocialIdAndSocialProvider(Long.parseLong(socialId), getProvider(socialProvider))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER));

        return GetMemberResponse.builder()
                .memberId(member.getId())
                .socialId(member.getSocialId())
                .socialProvider(member.getSocialProvider().getName())
                .memberNickname(member.getNickname())
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