package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
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