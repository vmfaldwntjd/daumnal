package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.global.dto.PageResponse;
import com.ssafy.daumnal.global.exception.LimitExceededException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.exception.NotSameException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.music.dto.MusicDTO.GetMusicResponse;
import com.ssafy.daumnal.music.dto.PlaylistDTO.GetMusicsInPlaylistResponse;
import com.ssafy.daumnal.music.dto.PlaylistDTO.GetPlaylistResponse;
import com.ssafy.daumnal.music.dto.PlaylistDTO.AddPlaylistRequest;
import com.ssafy.daumnal.music.entity.Music;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.music.entity.PlaylistMusic;
import com.ssafy.daumnal.music.repository.MusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistMusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistRepository;
import com.ssafy.daumnal.music.service.PlaylistService;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.global.constants.PageSize.PLAYLIST_LIST_SIZE;

import java.util.ArrayList;
import java.util.List;

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
        if (playlistMusicRepository.countByPlaylist(playlist) >= 30) {
            throw new LimitExceededException(PLAYLIST_AND_MUSIC_LIMIT_EXCEEDED);
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
     * @param pgno 현재 페이지 수
     * @return
     */
    @Override
    public PageResponse getPlaylists(String memberId, int pgno) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        PageRequest pageRequest = PageRequest.of(pgno - 1, PLAYLIST_LIST_SIZE);
        Page<Playlist> playlistsPage = playlistRepository.findByMember(member, pageRequest);
        Page<GetPlaylistResponse> playlistsPageResponse = playlistsPage.map(Playlist::toGetPlaylistResponse);

        return PageResponse.builder()
                .page(playlistsPageResponse)
                .build();
    }

    /**
     * 플레이리스트의 노래 리스트 조회
     * @param memberId 로그인 상태인 회원 id
     * @param playlistId 조회할 플레이리스트 id
     * @return
     */
    @Override
    public GetMusicsInPlaylistResponse getMusicsInPlaylist(String memberId, Long playlistId) {
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
        List<PlaylistMusic> musicsInPlaylist = playlistMusicRepository.findByPlaylist(playlist);
        List<GetMusicResponse> musicsInPlaylistResponse = new ArrayList<>();
        for (PlaylistMusic playlistMusic : musicsInPlaylist) {
            musicsInPlaylistResponse.add(playlistMusic.getMusic().toGetMusicResponse());
        }

        return GetMusicsInPlaylistResponse.builder()
            .musics(musicsInPlaylistResponse)
            .build();
    }
}