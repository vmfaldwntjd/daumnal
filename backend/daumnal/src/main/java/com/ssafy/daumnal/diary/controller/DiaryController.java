package com.ssafy.daumnal.diary.controller;

import com.ssafy.daumnal.diary.dto.DiaryDTO.*;
import com.ssafy.daumnal.diary.service.DiaryService;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.DiaryEmotion;
import com.ssafy.daumnal.emotion.dto.EmotionDTO.GetAllEmotionByMonth;
import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;
    private final JwtProvider jwtProvider;

    /**
     * 일기 작성 여부 확인 API
     * @param authentication
     * @return
     */
    @GetMapping("/today")
    public ApiResponse<?> getDiaryWritten(Authentication authentication) {
        String memberId = jwtProvider.getMemberInfo(authentication);
        GetDiaryWrittenTodayResponse diaryWrittenTodayResponse = diaryService.getDiaryWritten(memberId);
        return ApiResponse.success(SuccessCode.GET_DIARY_STATUS, diaryWrittenTodayResponse);
    }

    /**
     * 일기 입력 API
     * @param authentication
     * @return
     */
    @PostMapping
    public ApiResponse<?> addDiary(Authentication authentication,
                                   @ModelAttribute DiaryRequest diaryRequest) {
        String memberId = jwtProvider.getMemberInfo(authentication);

        AddDiaryResponse response = diaryService.addDiary(memberId, diaryRequest.getDiaryTitle(), diaryRequest.getDiaryContent(),
                diaryRequest.getDiaryHashTag(), diaryRequest.getDiaryPhoto(), diaryRequest.getDiaryEmotion());
        return ApiResponse.success(SuccessCode.CREATE_DIARY, response);
    }

    /**
     * 캘린더 조회 API
     * @param authentication
     * @param year
     * @param month
     * @return
     */
    @GetMapping("/calendar")
    public ApiResponse<?> getCalendar(Authentication authentication,
                                   @RequestParam(required = false) String year,
                                   @RequestParam(required = false) String month) {
        String memberId = jwtProvider.getMemberInfo(authentication);
        GetCalendarResponse response = diaryService.getCalendar(memberId, year, month);
        return ApiResponse.success(SuccessCode.GET_DIARY_CALENDAR,response);
    }

    /**
     * 오늘 작성한 일기에서 추천된 노래 저장
     * @param authentication 로그인 상태인 회원
     * @param diaryId 오늘 작성한 일기 id
     * @param musicId 추천된 노래 id
     * @return
     */
    @PatchMapping("/{diaryId}/musics/{musicId}")
    public ApiResponse<?> addTodayRecommendedMusic(Authentication authentication,
                                            @PathVariable Long diaryId, @PathVariable Long musicId) {
        diaryService.addTodayRecommendedMusic(jwtProvider.getMemberInfo(authentication), diaryId, musicId);

        return ApiResponse.success(SuccessCode.UPDATE_TODAY_RECOMMENDED_MUSIC);
    }

    /**
     * 일기 내용 조회 API
     *
     * @param authentication
     * @param diaryId
     * @return
     */
    @GetMapping("/{diaryId}")
    public ApiResponse<?> getDiary(Authentication authentication, @PathVariable String diaryId) {
        String memberId = jwtProvider.getMemberInfo(authentication);

        GetDiaryResponse response = diaryService.getDiary(memberId, diaryId);
        return ApiResponse.success(SuccessCode.GET_DIARY, response);
    }

    /**
     * 월별 감정 정보 조회 API
     *
     * @param authentication
     * @param year
     * @param month
     * @return
     */
    @GetMapping("/emotions")
    public ApiResponse<?> getAllEmotionByMonth(Authentication authentication,
                                      @RequestParam(required = false) String year,
                                      @RequestParam(required = false) String month) {
        String memberId = jwtProvider.getMemberInfo(authentication);

        GetAllEmotionByMonth response = diaryService.getAllEmotionByMonth(memberId, year, month);
        return ApiResponse.success(SuccessCode.GET_DIARY_MONTH_EMOTION, response);
    }

    /**
     * 일별 감정 정보 조회 API
     *
     * @param authentication
     * @param emotionId
     * @return
     */
    @GetMapping("/emotions/{emotionId}")
    public ApiResponse<?> getEmotionByDay(Authentication authentication,
                                             @PathVariable String emotionId) {
        String memberId = jwtProvider.getMemberInfo(authentication);
        DiaryEmotion response = diaryService.getEmotionByDay(memberId, emotionId);

        return ApiResponse.success(SuccessCode.GET_DIARY_DAY_EMOTION, response);
    }

    /**
     * 일기 삭제 API
     *
     * @param authentication
     * @param diaryId
     * @return
     */
    @DeleteMapping("/{diaryId}")
    public ApiResponse<?> removeDiary(Authentication authentication,
                                      @PathVariable String diaryId) {
        String memberId = jwtProvider.getMemberInfo(authentication);

        RemoveDiaryResponse response = diaryService.removeDiary(memberId, diaryId);
        return ApiResponse.success(SuccessCode.DELETE_DIARY, response);
    }

    /**
     * 좋아하는 가사 문장 리스트 추가
     * @param authentication 로그인 상태인 회원
     * @param diaryId 추가할 일기 id
     * @param addFavoriteLyrics 좋아하는 가사 문장 번호 배열
     * @return
     */
    @PatchMapping("/{diaryId}/lyrics")
    public ApiResponse<?> addFavoriteLyrics(Authentication authentication, @PathVariable Long diaryId, @RequestBody AddFavoriteLyrics addFavoriteLyrics) {
        diaryService.addFavoriteLyrics(jwtProvider.getMemberInfo(authentication), diaryId, addFavoriteLyrics);

        return ApiResponse.success(SuccessCode.ADD_FAVORITE_LYRICS);
    }
}