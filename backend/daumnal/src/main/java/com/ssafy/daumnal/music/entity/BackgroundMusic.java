package com.ssafy.daumnal.music.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "background_music")
public class BackgroundMusic extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "youtube_id", nullable = false, length = 200)
    private String youtubeId;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private BackgroundMusicCategory category;
}