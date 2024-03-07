package com.ssafy.daumnal.diary.entity;

import com.ssafy.daumnal.emotion.entity.Emotion;
import com.ssafy.daumnal.global.entity.BaseEntity;
import com.ssafy.daumnal.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Table(name = "diary")
public class Diary extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "music_id")
    private Long musicId;

    @Column(name = "title", nullable = false)
    @Size(max = 30)
    private String title;

    @Column(name = "content", nullable = false)
    @Size(max = 3000)
    private String content;

    @Column(name = "hash_tag")
    @Size(max = 30)
    private String hashTag;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "lyrics_line_number")
    private String lyricsLineNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Emotion emotion;
}