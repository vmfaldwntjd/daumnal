package com.ssafy.daumnal.music.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
}