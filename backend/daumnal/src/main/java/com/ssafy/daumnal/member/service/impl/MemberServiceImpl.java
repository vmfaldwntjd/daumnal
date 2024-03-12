package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.member.dto.MemberDTO.AddMemberRequest;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.entity.SocialProvider;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final String KAKAO = "kakao";
    private static final String NAVER = "naver";


    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void addMember(AddMemberRequest addMemberRequest) {

        SocialProvider socialProvider = getProvider(addMemberRequest.getSocialProvider());

        Member member = Member.builder()
                .socialId(Long.parseLong(addMemberRequest.getSocialId()))
                .socialProvider(socialProvider)
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