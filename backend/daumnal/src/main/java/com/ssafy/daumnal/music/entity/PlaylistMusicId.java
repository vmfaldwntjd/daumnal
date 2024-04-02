package com.ssafy.daumnal.music.entity;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@EqualsAndHashCode
@Getter
public class PlaylistMusicId implements Serializable {

    private Playlist playlist;

    private Music music;

    @Builder
    public PlaylistMusicId(Playlist playlist, Music music) {
        this.playlist = playlist;
        this.music = music;
    }
}