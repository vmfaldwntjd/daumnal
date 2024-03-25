package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackGroundMusicResponse;
import com.ssafy.daumnal.music.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.daumnal.global.constants.SuccessCode.GET_BACKGROUND_MUSIC;
import static com.ssafy.daumnal.global.constants.SuccessCode.GET_BACKGROUND_MUSICS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/background-musics")
public class BackgroundMusicController {

    private final BackgroundMusicService backgroundMusicService;
    private final JwtProvider jwtProvider;

    /**
     * 배경음악 조회 API
     *
     * @param authentication
     * @return
     */
    @GetMapping
    public ApiResponse<?> getAllBackgroundMusic(Authentication authentication) {
        return ApiResponse.success(GET_BACKGROUND_MUSICS,
                backgroundMusicService.getAllBackgroundMusic(jwtProvider.getMemberInfo(authentication)));
    }

    @GetMapping("/{backgroundMusicId}")
    public ApiResponse<?> getBackgroundMusic(Authentication authentication,
                                             @PathVariable String backgroundMusicId) {
        return ApiResponse.success(GET_BACKGROUND_MUSIC,
                backgroundMusicService.getBackgroundMusic(jwtProvider.getMemberInfo(authentication),
                backgroundMusicId));
    }
}