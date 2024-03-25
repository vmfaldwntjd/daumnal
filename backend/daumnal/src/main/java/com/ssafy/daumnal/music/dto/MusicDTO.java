package com.ssafy.daumnal.music.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import com.ssafy.daumnal.music.dto.PlaylistDTO.*;

import java.util.List;

public class MusicDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetPlaylistsToSaveMusicResponse {
        private List<GetPlaylistToSaveMusicResponse> playlists;
    }
}