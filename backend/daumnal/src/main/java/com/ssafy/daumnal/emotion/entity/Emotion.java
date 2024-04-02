package com.ssafy.daumnal.emotion.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "emotion")
public class Emotion extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fear")
    private int fear;

    @Column(name = "surprise")
    private int surprise;

    @Column(name = "angry")
    private int angry;

    @Column(name = "sadness")
    private int sadness;

    @Column(name = "neutral")
    private int neutral;

    @Column(name = "happiness")
    private int happiness;

    @Column(name = "disgust")
    private int disgust;
}