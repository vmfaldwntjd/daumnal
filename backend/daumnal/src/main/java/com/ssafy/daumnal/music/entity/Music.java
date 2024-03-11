package com.ssafy.daumnal.music.entity;

import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
@Table(name = "music")
public class Music extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "youtube_id", nullable = false)
    private String youtubeId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "lyrics", nullable = false)
    private String lyrics;

    @Column(name = "singer_name", nullable = false)
    private String singerName;

    @Column(name = "cover_url")
    @ColumnDefault("'https://daumnal.s3.ap-northeast-2.amazonaws.com/musicCover/basic_cover.jpg'")
    private String coverUrl;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private MusicCategory category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Emotion emotion;
}