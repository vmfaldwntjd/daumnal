package com.ssafy.daumnal.music.entity;

import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.global.entity.BaseEntity;
import com.ssafy.daumnal.music.dto.MusicDTO.GetMusicResponse;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static com.ssafy.daumnal.music.constants.MusicConstants.MUSIC_DEFAULT_COVER_URL;

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

    @Column(name = "youtube_id", nullable = false, length = 200)
    private String youtubeId;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "lyrics", nullable = false, columnDefinition = "TEXT")
    private String lyrics;

    @Column(name = "singer_name", nullable = false, length = 200)
    private String singerName;

    @Column(name = "cover_url", columnDefinition = "VARCHAR(3000)")
    @ColumnDefault(MUSIC_DEFAULT_COVER_URL)
    private String coverUrl;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private MusicCategory category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Emotion emotion;

    @Builder
    public Music(String youtubeId, String title, String lyrics, String singerName, String coverUrl, MusicCategory category, Emotion emotion) {
        this.youtubeId = youtubeId;
        this.title = title;
        this.lyrics = lyrics;
        this.singerName = singerName;
        this.coverUrl = coverUrl;
        this.category = category;
        this.emotion = emotion;
    }

    public GetMusicResponse toGetMusicResponse() {

        return GetMusicResponse.builder()
                .musicId(id)
                .musicYoutubeId(youtubeId)
                .musicTitle(title)
                .musicSingerName(singerName)
                .musicCoverUrl(coverUrl)
                .musicLyrics(lyrics)
                .build();
    }
}