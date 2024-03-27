package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.dto.PlaylistDTO.*;
import com.ssafy.daumnal.music.service.PlaylistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;
    private final JwtProvider jwtProvider;

    /**
     * 플레이리스트 생성
     * @param authentication 로그인 상태인 회원
     * @param addPlaylistRequest 새로 생성할 플레이리스트 정보 (이름, 커버)
     * @return
     */
    @PostMapping
    public ApiResponse<?> addPlaylist(Authentication authentication, @ModelAttribute @Valid AddPlaylistRequest addPlaylistRequest) {
        playlistService.addPlaylist(jwtProvider.getMemberInfo(authentication), addPlaylistRequest);

        return ApiResponse.success(SuccessCode.CREATE_PLAYLIST);
    }

    /**
     * 플레이리스트에 노래 추가
     * @param authentication 로그인 상태인 회원
     * @param playlistId 노래를 넣을 플레이리스트 id
     * @param musicId 플레이리스트에 추가할 노래 id
     * @return
     */
    @PostMapping("/{playlistId}/musics/{musicId}")
    public ApiResponse<?> addMusicToPlaylist(Authentication authentication, @PathVariable Long playlistId, @PathVariable Long musicId) {
        playlistService.addMusicToPlaylist(jwtProvider.getMemberInfo(authentication), playlistId, musicId);

        return ApiResponse.success(SuccessCode.ADD_MUSIC_TO_PLAYLIST);
    }

    /**
     * 플레이리스트 목록 조회
     * @param authentication 로그인 상태인 회원
     * @return
     */
    @GetMapping
    public ApiResponse<?> getPlaylists(Authentication authentication) {
        GetPlaylistsResponse playlistsResponse = playlistService.getPlaylists(jwtProvider.getMemberInfo(authentication));
        if (playlistsResponse.getPlaylists().isEmpty()) {

            return ApiResponse.success(SuccessCode.GET_EMPTY_PLAYLISTS);
        }

        return ApiResponse.success(SuccessCode.GET_PLAYLISTS, playlistsResponse);
    }

    /**
     * 플레이리스트 정보 조회
     * @param authentication 로그인 상태인 회원
     * @param playlistId 조회할 플레이리스트 id
     * @return
     */
    @GetMapping("/{playlistId}")
    public ApiResponse<?> getPlaylist(Authentication authentication, @PathVariable Long playlistId) {
        GetPlaylistResponse getPlaylistResponse =
            playlistService.getPlaylist(jwtProvider.getMemberInfo(authentication), playlistId);

        return ApiResponse.success(SuccessCode.GET_PLAYLIST, getPlaylistResponse);
    }

    /**
     * 플레이리스트에 저장된 노래 리스트 조회
     * @param authentication 로그인 상태인 회원
     * @param playlistId 조회할 플레이리스트 id
     * @return
     */
    @GetMapping("/{playlistId}/musics")
    public ApiResponse<?> getMusicsInPlaylist(Authentication authentication, @PathVariable Long playlistId) {
        GetMusicsInPlaylistResponse musicsInPlaylistResponse =
            playlistService.getMusicsInPlaylist(jwtProvider.getMemberInfo(authentication), playlistId);

        return ApiResponse.success(SuccessCode.GET_MUSICS_IN_PLAYLIST, musicsInPlaylistResponse);
    }

    /**
     * 플레이리스트에 저장된 노래 삭제
     * @param authentication 로그인 상태인 회원
     * @param playlistId 삭제할 노래가 들어있는 플레이리스트 id
     * @param musicId 플레이리스트에서 삭제할 노래 id
     * @return
     */
    @DeleteMapping("/{playlistId}/musics/{musicId}")
    public ApiResponse<?> removeMusicInPlaylist(Authentication authentication, @PathVariable Long playlistId, @PathVariable Long musicId) {
        playlistService.removeMusicInPlaylist(jwtProvider.getMemberInfo(authentication), playlistId, musicId);

        return ApiResponse.success(SuccessCode.DELETE_MUSIC_IN_PLAYLIST);
    }

    /**
     * 플레이리스트 정보 수정
     * @param authentication 로그인 상태인 회원
     * @param playlistId 정보 수정할 플레이리스트 id
     * @return
     */
    @PatchMapping("/{playlistId}")
    public ApiResponse<?> modifyPlaylist(Authentication authentication, @PathVariable Long playlistId, @ModelAttribute ModifyPlaylistRequest modifyPlaylistRequest) {
        playlistService.modifyPlaylist(jwtProvider.getMemberInfo(authentication), playlistId, modifyPlaylistRequest);

        return ApiResponse.success(SuccessCode.UPDATE_PLAYLIST);
    }

    /**
     * 플레이리스트 삭제
     * @param authentication 로그인 상태인 회원
     * @param playlistId 삭제할 플레이리스트 id
     * @return
     */
    @DeleteMapping("/{playlistId}")
    public ApiResponse<?> removePlaylist(Authentication authentication, @PathVariable Long playlistId) {
        playlistService.removePlaylist(jwtProvider.getMemberInfo(authentication), playlistId);

        return ApiResponse.success(SuccessCode.DELETE_PLAYLIST);
    }
}