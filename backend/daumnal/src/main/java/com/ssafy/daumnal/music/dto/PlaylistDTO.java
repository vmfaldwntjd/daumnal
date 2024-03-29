package com.ssafy.daumnal.music.dto;

import java.util.List;

import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.music.entity.Playlist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import com.ssafy.daumnal.music.dto.MusicDTO.GetMusicResponse;

public class PlaylistDTO {

    @Getter
    @Setter
    public static class AddPlaylistRequest {
        @NotBlank(message = "플레이리스트 이름을 입력하지 않았습니다!")
        @Size(min = 1, max = 20, message = "플레이리스트 이름의 글자 수 제한을 지키지 않았습니다!")
        private String playlistName;
        private MultipartFile playlistCover;

        public Playlist toEntityWithCoverUrl(String coverUrl, Member member) {

            return Playlist.builder()
                    .name(playlistName)
                    .coverUrl(coverUrl)
                    .member(member)
                    .build();
        }
        public Playlist toEntityWithoutCoverUrl(Member member) {

            return Playlist.builder()
                    .name(playlistName)
                    .member(member)
                    .build();
        }
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetPlaylistsResponse {
        private List<GetPlaylistResponse> playlists;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetPlaylistResponse {
        private Long playlistId;
        private String playlistName;
        private String playlistCoverUrl;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetMusicsInPlaylistResponse {
        private List<GetMusicResponse> musics;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetPlaylistToSaveMusicResponse {
        private Long playlistId;
        private String playlistName;
        private boolean selected;
    }

    @Getter
    @Setter
    public static class ModifyPlaylistRequest {
        private String playlistName;
        private MultipartFile playlistCover;
    }
}