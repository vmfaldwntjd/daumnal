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

        // 일기 제목 입력 안했을 시
        if (!StringUtils.hasText(diaryTitle)) {
            throw new NoExistException(NOT_EXISTS_DIARY_TITLE_INPUT);
        }

        // 일기 내용 입력하지 않았을 경우
        if (!StringUtils.hasText(diaryTitle)) {
            throw new NoExistException(NOT_EXISTS_DIARY_CONTENT_INPUT);
        }

        // 감정 정보가 누락된 게 있는지 확인하기
        if (!diaryUtilService.allEmotionsExist(diaryEmotion)) {
            throw new NoExistException(NOT_EXISTS_DIARY_EMOTION_INPUT);
        }

        // 일기 내용 글자 수가 3000자가 넘어간 경우
        if (diaryContent.length() > CONTENT_MAX_LENGTH) {
            throw new InvalidException(INVALID_DIARY_CONTENT_LENGTH);
        }

        // 해시태그 나누기 (공백 기준)
        String[] tags = diaryHashTag.split(SPLIT_REGEX);

        // 개수 3개 넘어가는지 확인
        if (tags.length > HASH_TAG_MAX_COUNT) {
            throw new InvalidException(INVALID_DIARY_HASHTAG_COUNT);
        }

        // 각 해시태그마다 유효성 검사
        for (String tag : tags) {
            // 올바른 입력인지 확인
            if (!tag.matches(HASH_TAG_REGEX)) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_WORDS);
            }

            if (tag.length() > HASH_TAG_MAX_LENGTH) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_LENGTH);
            }
        }

        // 이미지가 존재한다면 이미지 url 추출
        String photoUrl = null;

        if (Objects.nonNull(diaryPhoto)) {
            photoUrl = s3Service.uploadDiaryPhoto(diaryPhoto);
        }

        // 감정 정보 입력하기
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

        //일기 엔티티 생성
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