package com.ssafy.daumnal.diary.service.impl;

import com.ssafy.daumnal.diary.dto.DiaryDTO.DiaryEmotion;
import com.ssafy.daumnal.diary.dto.DiaryDTO.GetDiaryWrittenTodayResponse;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.diary.repository.DiaryRepository;
import com.ssafy.daumnal.diary.service.DiaryService;
import com.ssafy.daumnal.diary.util.DiaryUtilService;
import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.emotion.repository.EmotionRepository;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.s3.service.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

import static com.ssafy.daumnal.diary.constants.DiaryConstants.*;
import static com.ssafy.daumnal.global.constants.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberUtilService memberUtilService;
    private final MemberRepository memberRepository;
    private final DiaryUtilService diaryUtilService;
    private final S3Service s3Service;
    private final EmotionRepository emotionRepository;

    @Override
    public GetDiaryWrittenTodayResponse getDiaryWritten(String memberId) {

        GetDiaryWrittenTodayResponse writtenResponse = GetDiaryWrittenTodayResponse.builder()
                .written(false)
                .build();

        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());

        if (diaryRepository.existsByMember(member)) {
            writtenResponse.setWritten(true);
        }

        return writtenResponse;
    }

    @Transactional
    @Override
    public void addDiary(String memberId, String diaryTitle, String diaryContent,
                         String diaryHashTag, MultipartFile diaryPhoto, DiaryEmotion diaryEmotion) {
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());

        diaryUtilService.validateExistsDiaryTitle(diaryTitle);
        diaryUtilService.validateExistsDiaryContent(diaryContent);
        diaryUtilService.validateExistAllEmotions(diaryEmotion);
        diaryUtilService.validateDiaryContentLength(diaryContent);
        
        String[] tags = diaryHashTag.split(SPLIT_REGEX);
        diaryUtilService.validateHashTagCount(tags);
        diaryUtilService.validateHashTagInput(tags);

        String photoUrl = null;

        if (Objects.nonNull(diaryPhoto)) {
            photoUrl = s3Service.uploadDiaryPhoto(diaryPhoto);
        }

        Emotion emotion = Emotion.builder()
                .fear(diaryEmotion.getFear())
                .surprise(diaryEmotion.getSurprise())
                .angry(diaryEmotion.getAngry())
                .sadness(diaryEmotion.getSadness())
                .neutral(diaryEmotion.getNeutral())
                .happiness(diaryEmotion.getHappiness())
                .disgust(diaryEmotion.getDisgust())
                .build();
        emotionRepository.save(emotion);

        Diary diary = Diary.builder()
                .title(diaryTitle)
                .content(diaryContent)
                .hashTag(diaryHashTag)
                .photoUrl(photoUrl)
                .member(member)
                .emotion(emotion)
                .build();

        diaryRepository.save(diary);
    }
}