package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.dto.MusicDTO.*;
import com.ssafy.daumnal.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/musics")
public class MusicController {

    private final MusicService musicService;
    private final JwtProvider jwtProvider;

    /**
     * 노래를 저장할 플레이리스트 목록 조회
     * @param authentication 로그인 상태인 회원
     * @param musicId 플레이리스트에 저장할 노래 id
     * @return
     */
    @GetMapping("/{musicId}/playlists")
    public ApiResponse<?> getPlaylistsToSaveMusic(Authentication authentication, @PathVariable Long musicId) {
        GetPlaylistsToSaveMusicResponse getPlaylistsToSaveMusicResponse =
                musicService.getPlaylistsToSaveMusic(jwtProvider.getMemberInfo(authentication), musicId);

        return ApiResponse.success(SuccessCode.GET_PLAYLISTS_TO_SAVE_MUSIC, getPlaylistsToSaveMusicResponse);
    }
}