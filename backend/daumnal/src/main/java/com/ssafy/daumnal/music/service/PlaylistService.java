package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.PlaylistDTO.*;
import com.ssafy.daumnal.music.dto.PlaylistDTO.AddPlaylistRequest;

public interface PlaylistService {

    void addPlaylist(String memberId, AddPlaylistRequest addPlaylistRequest);

    void addMusicToPlaylist(String memberId, Long playlistId, Long musicId);

    GetPlaylistsResponse getPlaylists(String memberId);
}