package com.ssafy.daumnal.member.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "background_music_id", nullable = false)
    @ColumnDefault("1")
    private Long backgroundMusicId;

    @Column(name = "social_id", nullable = false)
    private Long socialId;

    @Column(name = "social_provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialProvider socialProvider;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    @ColumnDefault("1")
    private MemberStatus status;
}