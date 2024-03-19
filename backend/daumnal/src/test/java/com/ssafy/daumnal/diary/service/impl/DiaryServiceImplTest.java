package com.ssafy.daumnal.diary.service.impl;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.diary.repository.DiaryRepository;
import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.emotion.repository.EmotionRepository;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.entity.SocialProvider;
import com.ssafy.daumnal.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class DiaryServiceImplTest {

    @Autowired private DiaryRepository diaryRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private EmotionRepository emotionRepository;

    @DisplayName("일기 입력 확인")
    @Transactional
    @Test
    void addDiaryTest() {
        //given
        Emotion emotion = Emotion.builder()
                .fear(1000)
                .surprise(2000)
                .angry(3000)
                .sadness(4000)
                .neutral(5000)
                .happiness(6000)
                .disgust(7000)
                .build();
        emotionRepository.save(emotion);

        Member member = Member.builder()
                .socialId(1234L)
                .socialProvider(SocialProvider.KAKAO)
                .nickname("test")
                .build();
        memberRepository.save(member);

        Diary diary = Diary.builder()
                .id(1L)
                .title("diaryTitle")
                .content("diaryContent")
                .hashTag("diaryHashTag")
                .photoUrl("photoUrl")
                .member(member)
                .emotion(emotion)
                .build();
        //when
        diaryRepository.save(diary);

        //then
        assertThat(diaryRepository.existsById(1L)).isTrue();
    }
}