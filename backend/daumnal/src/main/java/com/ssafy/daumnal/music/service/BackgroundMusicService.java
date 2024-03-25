package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackgroundMusicResponse;

public interface BackgroundMusicService {
    GetBackgroundMusicResponse getAllBackgroundMusic(String memberId);
}