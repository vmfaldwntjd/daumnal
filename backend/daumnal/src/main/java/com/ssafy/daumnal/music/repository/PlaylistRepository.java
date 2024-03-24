package com.ssafy.daumnal.music.repository;

import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.music.entity.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    Page<Playlist> findByMember(Member member, Pageable pageable);
}