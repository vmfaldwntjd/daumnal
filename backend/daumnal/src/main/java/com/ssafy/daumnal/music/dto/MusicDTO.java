package com.ssafy.daumnal.music.dto;

import com.ssafy.daumnal.emotion.dto.EmotionDTO.*;
import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.music.entity.Music;
import com.ssafy.daumnal.music.entity.MusicCategory;
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
	public static class GetMusicsResponse {
		List<GetMusicResponse> musics;
	}

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

	@Getter
	@Setter
	public static class AddMusicsRequest {
		private List<AddMusicRequest> musics;
	}

	@Getter
	@Setter
	public static class AddMusicRequest {
		private String musicYoutubeId;
		private String musicTitle;
		private String musicSingerName;
		private String musicCoverUrl;
		private String musicCategory;
		private String musicLyrics;
		private MusicEmotion musicEmotion;

		public Music toEntityWith(Emotion emotion) {
			return Music.builder()
					.youtubeId(musicYoutubeId)
					.title(musicTitle)
					.singerName(musicSingerName)
					.coverUrl(musicCoverUrl)
					.category(MusicCategory.valueOf(musicCategory))
					.lyrics(musicLyrics)
					.emotion(emotion)
					.build();
		}
	}
}