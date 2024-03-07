package com.ssafy.daumnal.music.repository;

import com.ssafy.daumnal.music.entity.BackgroundMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundMusicRepository extends JpaRepository<BackgroundMusic, Long> {
}