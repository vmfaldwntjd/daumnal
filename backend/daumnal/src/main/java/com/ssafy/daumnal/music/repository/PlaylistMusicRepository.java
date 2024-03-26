package com.ssafy.daumnal.music.repository;

import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.music.entity.Music;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.music.entity.PlaylistMusic;
import com.ssafy.daumnal.music.entity.PlaylistMusicId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistMusicRepository extends JpaRepository<PlaylistMusic, PlaylistMusicId> {

    Long countByPlaylist(Playlist playlist);

    List<PlaylistMusic> findByPlaylist(Playlist playlist);

    @Query(
            "SELECT pm.playlist FROM PlaylistMusic pm "
            + "WHERE pm.music = :music "
            + "AND pm.playlist.member = :member"
    )
    List<Playlist> findByMusicAndMember(@Param("music") Music music, @Param("member") Member member);
}