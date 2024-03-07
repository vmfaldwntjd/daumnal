package com.ssafy.daumnal.music.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "background-music")
public class BackgroundMusic extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "youtube_id", nullable = false)
    private String youtubeId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private String category;
}