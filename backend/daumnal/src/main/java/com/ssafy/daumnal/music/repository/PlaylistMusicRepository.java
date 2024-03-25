package com.ssafy.daumnal.music.repository;

<<<<<<< HEAD
import java.util.List;

=======
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.music.entity.Music;
>>>>>>> b00fd9de8b5bc8db2809db68d4ed2635f105273e
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