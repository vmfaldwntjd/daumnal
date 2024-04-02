package com.ssafy.daumnal.diary.entity;

import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.global.entity.BaseEntity;
import com.ssafy.daumnal.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@DynamicUpdate
@Table(name = "diary")
public class Diary extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "music_id")
    private Long musicId;

    @Column(name = "title", length = 40)
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "hash_tag", length = 20)
    private String hashTag;

    @Column(name = "photo_url", columnDefinition = "TEXT")
    private String photoUrl;

    @Column(name = "lyrics_line_number", length = 1000)
    private String lyricsLineNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Emotion emotion;

    public void updateMusicId(Long musicId) {
        this.musicId = musicId;
    }

    public void updateLyricsLineNumber(String lyricsLineNumber) {
        this.lyricsLineNumber = lyricsLineNumber;
    }
}