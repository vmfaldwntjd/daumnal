package com.ssafy.daumnal.music.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.music.dto.PlaylistDTO.*;
import com.ssafy.daumnal.music.dto.PlaylistDTO.GetPlaylistResponse;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
@DynamicUpdate
@Table(name = "playlist")
public class Playlist extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "cover_url")
    @ColumnDefault("'https://daumnal.s3.ap-northeast-2.amazonaws.com/playlistCover/playlist_default.png'")
    private String coverUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Builder
    public Playlist(String name, String coverUrl, Member member) {
        this.name = name;
        this.coverUrl = coverUrl;
        this.member = member;
    }

    @Builder
    public Playlist(String name, Member member) {
        this.name = name;
        this.member = member;
    }

    public GetPlaylistResponse toGetPlaylistResponse() {

        return GetPlaylistResponse.builder()
                .playlistId(id)
                .playlistName(name)
                .playlistCoverUrl(coverUrl)
                .build();
    }

    public GetPlaylistToSaveMusicResponse toGetPlaylistToSaveMusicResponse(boolean isSelected) {

        return GetPlaylistToSaveMusicResponse.builder()
                .playlistId(id)
                .playlistName(name)
                .isSelected(isSelected)
                .build();
    }
}