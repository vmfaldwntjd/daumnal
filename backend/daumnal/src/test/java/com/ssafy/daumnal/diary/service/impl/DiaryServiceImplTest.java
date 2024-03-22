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

import java.util.List;

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

    @DisplayName("특정 회원이 쓴 일기 목록 최신순 정렬 확인")
    @Transactional
    @Test
    void getDiariesByMemberTest() {
        //given
        Long memberId = 16L;
        Member member = memberRepository.findById(memberId)
                .orElseThrow();

        //when
        List<Diary> diariesByMember = diaryRepository
                .findDiariesByMemberOrderByCreatedAtDesc(member);

        //then
        assertThat(isSortedByCreatedAtDesc(diariesByMember)).isTrue();
    }

    private boolean isSortedByCreatedAtDesc(List<Diary> diaries) {
        for (int i = 0; i < diaries.size() - 1; ++i) {
            String currentDiary = diaries.get(i).getCreatedAt().split(" ")[0];
            String preDiary = diaries.get(i + 1).getCreatedAt().split(" ")[0];

            if (!validateDiaryOrder(currentDiary, preDiary)) {
                return false;
            }
        }
        return true;
    }

    private boolean validateDiaryOrder(String currentDiary, String preDiary) {
        boolean flag = true;

        String[] curDiary = currentDiary.split("-");
        String[] pDiary = preDiary.split("-");

        int curYear = Integer.parseInt(curDiary[0]);
        int pYear = Integer.parseInt(pDiary[0]);
        int curMonth = Integer.parseInt(curDiary[1]);
        int pMonth = Integer.parseInt(pDiary[1]);
        int curDay = Integer.parseInt(curDiary[2]);
        int pDay = Integer.parseInt(pDiary[2]);

        if (curYear < pYear) {
            flag = false;
        } else if (curYear == pYear && curMonth < pMonth){
            flag = false;
        } else if (curYear == pYear && curMonth == pMonth && curDay < pDay) {
            flag = false;
        }

        return flag;
    }
}