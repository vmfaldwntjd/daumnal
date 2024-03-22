package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.PlaylistDTO;

public interface PlaylistService {

    void addPlaylist(String memberId, PlaylistDTO.AddPlaylistRequest addPlaylistRequest);
}