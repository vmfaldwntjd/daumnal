package com.ssafy.daumnal.music.repository;

import java.util.List;

import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.music.entity.PlaylistMusic;
import com.ssafy.daumnal.music.entity.PlaylistMusicId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistMusicRepository extends JpaRepository<PlaylistMusic, PlaylistMusicId> {

    Long countByPlaylist(Playlist playlist);

    List<PlaylistMusic> findByPlaylist(Playlist playlist);
}