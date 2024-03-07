package com.ssafy.daumnal.backgroundmusic.repository;

import com.ssafy.daumnal.backgroundmusic.entity.BackgroundMusic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackgroundMusicRepository extends JpaRepository<BackgroundMusic, Long> {
}