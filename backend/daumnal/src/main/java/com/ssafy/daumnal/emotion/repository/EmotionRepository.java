package com.ssafy.daumnal.emotion.repository;

import com.ssafy.daumnal.emotion.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<Emotion, Long> {
}
