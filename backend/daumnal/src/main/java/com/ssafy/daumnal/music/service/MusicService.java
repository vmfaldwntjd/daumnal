package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.MusicDTO.*;

public interface MusicService {

    GetPlaylistsToSaveMusicResponse getPlaylistsToSaveMusic(String memberId, Long musicId);
}