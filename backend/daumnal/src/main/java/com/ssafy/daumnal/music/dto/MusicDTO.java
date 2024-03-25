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
	@AllArgsConstructor
	@Builder
	public static class GetMusicResponse {
		private Long musicId;
		private String musicYoutubeId;
		private String musicTitle;
		private String musicSingerName;
		private String musicCoverUrl;
		private String musicLyrics;
	}

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetPlaylistsToSaveMusicResponse {
        private List<GetPlaylistToSaveMusicResponse> playlists;
    }
}