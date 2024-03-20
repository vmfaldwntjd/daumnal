package com.ssafy.daumnal.diary.controller;

import com.ssafy.daumnal.diary.dto.DiaryDTO.AddDiaryResponse;
import com.ssafy.daumnal.diary.dto.DiaryDTO.DiaryRequest;
import com.ssafy.daumnal.diary.dto.DiaryDTO.GetDiaryWrittenTodayResponse;
import com.ssafy.daumnal.diary.service.DiaryService;
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
}