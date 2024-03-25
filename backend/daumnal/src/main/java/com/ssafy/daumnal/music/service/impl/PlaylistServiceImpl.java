package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.global.exception.LimitExceededException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.exception.NotSameException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.music.dto.PlaylistDTO.*;
import com.ssafy.daumnal.music.entity.Music;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.music.entity.PlaylistMusic;
import com.ssafy.daumnal.music.repository.MusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistMusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistRepository;
import com.ssafy.daumnal.music.service.PlaylistService;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.music.constants.MusicConstants.*;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;
    private final MusicRepository musicRepository;
    private final MemberRepository memberRepository;
    private final MemberUtilService memberUtilService;
    private final S3Service s3Service;

    /**
     * 플레이리스트 생성
     * @param memberId 로그인 상태인 회원 id
     * @param addPlaylistRequest 새로 생성할 플레이리스트 정보 (이름, 커버)
     */
    @Override
    public void addPlaylist(String memberId, AddPlaylistRequest addPlaylistRequest) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        if (playlistRepository.countByMember(member) >= PLAYLIST_MAX_NUMBER) {
            throw new LimitExceededException(PLAYLIST_LIMIT_EXCEEDED);
        }
        if (addPlaylistRequest.getPlaylistCover() != null) {
            String coverUrl = s3Service.uploadPlaylistCover(addPlaylistRequest.getPlaylistCover(), null);
            playlistRepository.save(addPlaylistRequest.toEntityWithCoverUrl(coverUrl, member));
        }
        if (addPlaylistRequest.getPlaylistCover() == null) {
            playlistRepository.save(addPlaylistRequest.toEntityWithoutCoverUrl(member));
        }
    }

    /**
     * 플레이리스트에 노래 추가
     * @param memberId 로그인 상태인 회원 id
     * @param playlistId 노래를 넣을 플레이리스트 id
     * @param musicId 플레이리스트에 추가할 노래 id
     */
    @Override
    public void addMusicToPlaylist(String memberId, Long playlistId, Long musicId) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        Playlist playlist = playlistRepository.findById(playlistId)
                        .orElseThrow(() -> new NoExistException(NOT_EXISTS_PLAYLIST_ID));
        if (!playlist.getMember().equals(member)) {
            throw new NotSameException(NOT_SAME_LOGIN_MEMBER_AND_PLAYLIST_OWNER);
        }
        if (playlistMusicRepository.countByPlaylist(playlist) >= MUSICS_IN_PLAYLIST_MAX_NUMBER) {
            throw new LimitExceededException(MUSICS_IN_PLAYLIST_LIMIT_EXCEEDED);
        }
        Music music = musicRepository.findById(musicId)
                        .orElseThrow(() -> new NoExistException(NOT_EXISTS_MUSIC_ID));
        playlistMusicRepository.save(
                PlaylistMusic.builder()
                .playlist(playlist)
                .music(music)
                .build()
        );
    }

    /**
     * 플레이리스트 목록 조회
     * @param memberId 로그인 상태인 회원 id
     * @return
     */
    @Override
    public GetPlaylistsResponse getPlaylists(String memberId) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        List<Playlist> playlists = playlistRepository.findByMember(member);
        List<GetPlaylistResponse> playlistsResponse = new ArrayList<>();
        for (Playlist playlist : playlists) {
            playlistsResponse.add(playlist.toGetPlaylistResponse());
        }

        return GetPlaylistsResponse.builder()
                .playlists(playlistsResponse)
                .build();
    }
}