package com.ssafy.daumnal.diary.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "diary")
public class Diary extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "hash_tag")
    private String hashTag;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "lyrics_line_number")
    private String lyricsLineNumber;
}