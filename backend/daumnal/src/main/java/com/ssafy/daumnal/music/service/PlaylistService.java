package com.ssafy.daumnal.music.service;

import com.ssafy.daumnal.music.dto.PlaylistDTO.*;

public interface PlaylistService {

    void addPlaylist(String memberId, AddPlaylistRequest addPlaylistRequest);

    void addMusicToPlaylist(String memberId, Long playlistId, Long musicId);

    GetPlaylistsResponse getPlaylists(String memberId);

    GetPlaylistResponse getPlaylist(String memberId, Long playlistId);

    GetMusicsInPlaylistResponse getMusicsInPlaylist(String memberId, Long playlistId);
}