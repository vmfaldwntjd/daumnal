package com.ssafy.daumnal.diary.service.impl;

import com.ssafy.daumnal.diary.dto.DiaryDTO.*;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.diary.repository.DiaryRepository;
import com.ssafy.daumnal.diary.service.DiaryService;
import com.ssafy.daumnal.diary.util.DiaryUtilService;
import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.emotion.repository.EmotionRepository;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.exception.NotSameException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.music.repository.MusicRepository;
import com.ssafy.daumnal.s3.service.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
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
    private final MusicRepository musicRepository;

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
    public AddDiaryResponse addDiary(String memberId, String diaryTitle, String diaryContent,
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
                .fear(Integer.parseInt(diaryEmotion.getFear()))
                .surprise(Integer.parseInt(diaryEmotion.getSurprise()))
                .angry(Integer.parseInt(diaryEmotion.getAngry()))
                .sadness(Integer.parseInt(diaryEmotion.getSadness()))
                .neutral(Integer.parseInt(diaryEmotion.getNeutral()))
                .happiness(Integer.parseInt(diaryEmotion.getHappiness()))
                .disgust(Integer.parseInt(diaryEmotion.getDisgust()))
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

        return AddDiaryResponse.builder()
                .diaryId(String.valueOf(diary.getId()))
                .build();
    }

    @Override
    public GetCalendarResponse getCalendar(String memberId, String year, String month) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        diaryUtilService.validateExistsDiaryYearInput(year);
        diaryUtilService.validateExistsDiaryMonthInput(month);
        diaryUtilService.validateDiaryYearInput(year);
        diaryUtilService.validateDiaryMonthInput(month);


        List<CalendarContent> calendarContents = new ArrayList<>();

        //Todo: 비즈니스 로직 구현


        return GetCalendarResponse.builder()
                .calendarContents(calendarContents)
                .build();
    }

    /**
     * 오늘 작성한 일기에서 추천된 노래 저장
     * @param memberId 로그인 상태인 회원
     * @param diaryId 오늘 작성한 일기 id
     * @param musicId 추천된 노래 id
     */
    @Override
    @Transactional
    public void addTodayRecommendedMusic(String memberId, Long diaryId, Long musicId) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
            .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new NoExistException(NOT_EXISTS_DIARY_ID));
        if (!diary.getMember().equals(member)) {
            throw new NotSameException(NOT_SAME_LOGIN_MEMBER_AND_DIARY_WRITER);
        }
        if(!musicRepository.existsById(musicId)) {
            throw new NoExistException(NOT_EXISTS_MUSIC_ID);
        }
        diary.updateMusicId(musicId);
    }
}