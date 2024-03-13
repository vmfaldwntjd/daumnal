package com.ssafy.daumnal.global.util;

import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.ssafy.daumnal.global.constants.ErrorCode.NOT_EXISTS_MEMBER_NICKNAME_GET;

@Service
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberNickname)
            throws UsernameNotFoundException {
        Member member = memberRepository.findMemberByNickname(memberNickname)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_NICKNAME_GET));

        return new MemberDetails(member);
    }
}
