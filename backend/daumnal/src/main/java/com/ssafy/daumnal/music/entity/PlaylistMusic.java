package com.ssafy.daumnal.music.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@IdClass(PlaylistMusicId.class)
@Table(name = "playlist_music")
public class PlaylistMusic {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Column(name = "playlist_id")
    private Playlist playlist;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Column(name = "music_id")
    private Music music;
}