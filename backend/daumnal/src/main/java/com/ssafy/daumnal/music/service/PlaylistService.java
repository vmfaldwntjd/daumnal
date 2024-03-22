package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.global.dto.PageResponse;
import com.ssafy.daumnal.music.dto.PlaylistDTO.AddPlaylistRequest;

public interface PlaylistService {

    void addPlaylist(String memberId, AddPlaylistRequest addPlaylistRequest);

    void addMusicToPlaylist(String memberId, Long playlistId, Long musicId);

    PageResponse getPlaylists(String memberId, int pgno);
}