package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.dto.MusicDTO.*;
import com.ssafy.daumnal.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    /**
     * 크롤링한 노래 리스트 추가
     * @param addMusicsRequest 추가할 노래 리스트
     * @return
     */
    @PostMapping
    public ApiResponse<?> addMusics(@RequestBody AddMusicsRequest addMusicsRequest) {
        musicService.addMusics(addMusicsRequest);

        return ApiResponse.success(SuccessCode.CREATE_MUSICS);
    }

    /**
     * 노래 정보 조회
     * @param authentication 로그인 상태인 회원
     * @param musicId 조회할 노래
     * @return
     */
    @GetMapping("/{musicId}")
    public ApiResponse<?> getMusic(Authentication authentication, @PathVariable Long musicId) {
        GetMusicResponse getMusicResponse = musicService.getMusic(jwtProvider.getMemberInfo(authentication), musicId);

        return ApiResponse.success(SuccessCode.GET_MUSIC, getMusicResponse);
    }
}