package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.music.dto.PlaylistDTO.AddPlaylistRequest;
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
}