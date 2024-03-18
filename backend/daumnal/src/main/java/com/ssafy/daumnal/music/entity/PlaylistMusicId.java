package com.ssafy.daumnal.music.entity;

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
}