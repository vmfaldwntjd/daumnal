package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackGroundMusicResponse;
import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackgroundMusicsResponse;

public interface BackgroundMusicService {
    GetBackgroundMusicsResponse getAllBackgroundMusic(String memberId);

    GetBackGroundMusicResponse getBackgroundMusic(String memberId, String backgroundMusicId);

    GetBackGroundMusicResponse modifyBackgroundMusic(String memberId, String backgroundMusicId);

    GetBackGroundMusicResponse getBackgroundMusicMemberSelect(String memberId);
}