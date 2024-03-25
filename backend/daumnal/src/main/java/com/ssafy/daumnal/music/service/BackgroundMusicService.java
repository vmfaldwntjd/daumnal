package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackgroundMusicsResponse;

public interface BackgroundMusicService {
    GetBackgroundMusicsResponse getAllBackgroundMusic(String memberId);
}