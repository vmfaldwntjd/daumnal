package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.daumnal.global.constants.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/background-musics")
public class BackgroundMusicController {

    private final BackgroundMusicService backgroundMusicService;
    private final JwtProvider jwtProvider;

    /**
     * 배경음악 목록 조회 API
     *
     * @param authentication
     * @return
     */
    @GetMapping
    public ApiResponse<?> getAllBackgroundMusic(Authentication authentication) {
        return ApiResponse.success(GET_BACKGROUND_MUSICS,
                backgroundMusicService.getAllBackgroundMusic(jwtProvider.getMemberInfo(authentication)));
    }

    @GetMapping("/member-select")
    public ApiResponse<?> getBackgroundMusicMemberSelect(Authentication authentication) {
        return ApiResponse.success(GET_BACKGROUND_MUSIC_MEMBER,
                backgroundMusicService.getBackgroundMusicMemberSelect(jwtProvider.getMemberInfo(authentication)));
    }

    /**
     * 선택한 배경음악 조회 API
     *
     * @param authentication
     * @param backgroundMusicId
     * @return
     */
    @GetMapping("/{backgroundMusicId}")
    public ApiResponse<?> getBackgroundMusic(Authentication authentication,
                                             @PathVariable String backgroundMusicId) {
        return ApiResponse.success(GET_BACKGROUND_MUSIC,
                backgroundMusicService.getBackgroundMusic(jwtProvider.getMemberInfo(authentication),
                backgroundMusicId));
    }

    /**
     * 배경음악 선택 API: 배경음악을 선택하면 회원이 선택한 배경 음악으로 변경이 된다.
     *
     * @param authentication
     * @param backgroundMusicId
     * @return
     */
    @PatchMapping("/{backgroundMusicId}")
    public ApiResponse<?> modifyBackgroundMusic(Authentication authentication,
                                             @PathVariable String backgroundMusicId) {
        return ApiResponse.success(UPDATE_BACKGROUND_MUSIC,
                backgroundMusicService.modifyBackgroundMusic(jwtProvider.getMemberInfo(authentication), backgroundMusicId));
    }
}