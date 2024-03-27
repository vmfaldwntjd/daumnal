package com.ssafy.daumnal.diary.service.impl;

import com.ssafy.daumnal.diary.dto.nativedto.CalendarContent;
import com.ssafy.daumnal.diary.dto.DiaryDTO.*;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.diary.repository.DiaryRepository;
import com.ssafy.daumnal.diary.service.DiaryService;
import com.ssafy.daumnal.diary.util.DiaryUtilService;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.DiaryEmotion;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.GetAllEmotionByMonth;
import com.ssafy.daumnal.emotion.dto.nativedto.GetEmotionByMonth;
import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.emotion.repository.EmotionRepository;
import com.ssafy.daumnal.emotion.util.EmotionUtilService;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import static com.ssafy.daumnal.diary.constants.DiaryConstants.*;
import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.global.constants.S3Path.DIARY_PHOTO_PATH;

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
    private final EmotionUtilService emotionUtilService;

    @Transactional
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

        LocalDate now = LocalDate.now();
        int nowYear = now.getYear();
        int nowMonth = now.getMonthValue();
        int nowDay = now.getDayOfMonth();

        if (diaryRepository.existsByMember(member)) {
            List<Diary> diaries = diaryRepository.findDiariesByMemberOrderByCreatedAtDesc(member);

            String[] diaryRecent = diaries.get(0).getCreatedAt().split(" ")[0].split("-");
            int diaryRecentYear = Integer.parseInt(diaryRecent[0]);
            int diaryRecentMonth = Integer.parseInt(diaryRecent[1]);
            int diaryRecentDay = Integer.parseInt(diaryRecent[2]);

            if (diaryRecentYear == nowYear && diaryRecentMonth == nowMonth && diaryRecentDay == nowDay) {
                writtenResponse.setWritten(true);
            }
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

        String[] tags = diaryHashTag.split(SPLIT_REGEX);
        diaryUtilService.validateHashTagCount(tags);
        diaryUtilService.validateHashTagInput(tags);

        String photoUrl = null;

        if (Objects.nonNull(diaryPhoto)) {
            photoUrl = s3Service.upload(diaryPhoto, DIARY_PHOTO_PATH);
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

        //Todo: 비즈니스 로직 구현
        // 특정 year, 특정 month에 쓴 일기 내역들 시간 순으로 가져오기 (완료)
        List<CalendarContent> calendarContents = diaryRepository.findDiariesByYearAndMonth(Long.parseLong(memberId),
                Integer.parseInt(year), Integer.parseInt(month));

        return GetCalendarResponse.builder()
                .calendarContents(calendarContents)
                .build();
    }

    /**
     * 오늘 작성한 일기에서 추천된 노래 저장
     * @param memberId 로그인 상태인 회원 id
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

    @Override
    public GetDiaryResponse getDiary(String memberId, String diaryId) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int status = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(status);
        memberUtilService.validateMemberStatusNotLogout(status);
        diaryUtilService.validateDiaryIdNumber(diaryId);

        Diary diary = diaryRepository.findById(Long.parseLong(diaryId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_DIARY_ID));

        StringBuilder sb = new StringBuilder();
        String[] date = diary.getCreatedAt().split(" ")[0].split("-");
        String diaryCreatedAt = sb.append(date[0]).append("년 ")
                .append(date[1]).append("월 ")
                .append(date[2]).append("일")
                .toString();

        return GetDiaryResponse.builder()
                .diaryTitle(diary.getTitle())
                .diaryContent(diary.getContent())
                .diaryHashTag(diary.getHashTag())
                .diaryPhotoUrl(diary.getPhotoUrl())
                .musicId(String.valueOf(diary.getMusicId()))
                .emotionId(String.valueOf(diary.getEmotion().getId()))
                .diaryCreatedAt(diaryCreatedAt)
                .build();
    }

    @Override
    public GetAllEmotionByMonth getAllEmotionByMonth(String memberId, String year, String month) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int status = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(status);
        memberUtilService.validateMemberStatusNotLogout(status);

        diaryUtilService.validateExistsDiaryYearInput(year);
        diaryUtilService.validateExistsDiaryMonthInput(month);
        diaryUtilService.validateDiaryYearInput(year);
        diaryUtilService.validateDiaryMonthInput(month);

        //Todo: 비즈니스 로직 작성
        List<GetEmotionByMonth> allEmotionByMonth = diaryRepository.findAllEmotionByMonth(Long.parseLong(memberId),
                Integer.parseInt(year), Integer.parseInt(month));

        return GetAllEmotionByMonth.builder()
                .diaryEmotions(allEmotionByMonth)
                .build();
    }

    @Override
    public DiaryEmotion getEmotionByDay(String memberId, String emotionId) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int status = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(status);
        memberUtilService.validateMemberStatusNotLogout(status);

        emotionUtilService.validateEmotionIdNumber(emotionId);

        Emotion emotion = emotionRepository.findById(Long.parseLong(emotionId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_DIARY_EMOTION_ID));

        return DiaryEmotion.builder()
                .fear(emotion.getFear())
                .surprise(emotion.getSurprise())
                .angry(emotion.getAngry())
                .sadness(emotion.getSadness())
                .neutral(emotion.getNeutral())
                .happiness(emotion.getHappiness())
                .disgust(emotion.getDisgust())
                .build();
    }

    @Override
    public RemoveDiaryResponse removeDiary(String memberId, String diaryId) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int status = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(status);
        memberUtilService.validateMemberStatusNotLogout(status);

        diaryUtilService.validateDiaryIdNumber(diaryId);
        Diary diary = diaryRepository.findById(Long.parseLong(diaryId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_DIARY_ID));

        diaryRepository.deleteById(diary.getId());
        return RemoveDiaryResponse.builder()
                .diaryId(diaryId)
                .build();
    }

    /**
     * 좋아하는 가사 문장 리스트 추가
     * @param memberId 로그인 상태인 회원 id
     * @param diaryId 추가할 일기 id
     * @param addFavoriteLyrics 좋아하는 가사 문장 번호 배열
     */
    @Override
    @Transactional
    public void addFavoriteLyrics(String memberId, Long diaryId, AddFavoriteLyrics addFavoriteLyrics) {
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

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < addFavoriteLyrics.getDiaryLyricsLineNumbers().length; i++) {
            sb.append(addFavoriteLyrics.getDiaryLyricsLineNumbers()[i]);
            if (i < addFavoriteLyrics.getDiaryLyricsLineNumbers().length - 1) {
                sb.append(" ");
            }
        }
        diary.updateLyricsLineNumber(sb.toString());
    }
}