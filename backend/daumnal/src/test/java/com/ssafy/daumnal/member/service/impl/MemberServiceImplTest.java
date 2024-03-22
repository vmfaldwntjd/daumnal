package com.ssafy.daumnal.member.service.impl;

import com.ssafy.daumnal.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MemberServiceImplTest {

    @Autowired MemberRepository memberRepository;

    @DisplayName("닉네임 존재 여부 검증")
    @Test
    void nicknameExistsTest() {
        //given
        String existNickname = "nick";

        //when
        boolean result = memberRepository.existsMemberByNickname(existNickname);

        //then
        assertThat(result).isTrue();
    }
}