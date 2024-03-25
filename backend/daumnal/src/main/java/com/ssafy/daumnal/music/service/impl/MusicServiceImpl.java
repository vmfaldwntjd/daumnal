package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.music.dto.MusicDTO.*;
import com.ssafy.daumnal.music.dto.PlaylistDTO.*;
import com.ssafy.daumnal.music.entity.Music;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.music.repository.MusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistMusicRepository;
import com.ssafy.daumnal.music.repository.PlaylistRepository;
import com.ssafy.daumnal.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.daumnal.global.constants.ErrorCode.NOT_EXISTS_MEMBER_ID;
import static com.ssafy.daumnal.global.constants.ErrorCode.NOT_EXISTS_MUSIC_ID;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final MemberRepository memberRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistMusicRepository playlistMusicRepository;
    private final MemberUtilService memberUtilService;

    /**
     * 노래를 저장할 플레이리스트 목록 조회
     * @param memberId 로그인 상태인 회원 id
     * @param musicId 플레이리스트에 저장할 노래 id
     * @return
     */
    @Override
    public GetPlaylistsToSaveMusicResponse getPlaylistsToSaveMusic(String memberId, Long musicId) {
        memberUtilService.validateMemberIdNumber(memberId);
        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        memberUtilService.validateMemberStatusNotLogout(member.getStatus().getValue());
        memberUtilService.validateMemberStatusNotDelete(member.getStatus().getValue());

        List<Playlist> playlists = playlistRepository.findByMember(member);
        Music music = musicRepository.findById(musicId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MUSIC_ID));
        List<Playlist> playlistSelected = playlistMusicRepository.findByMusicAndMember(music, member);
        List<GetPlaylistToSaveMusicResponse> getPlaylistsToSaveMusicResponse = new ArrayList<>();
        for (Playlist playlist : playlists) {
            getPlaylistsToSaveMusicResponse.add(playlist.toGetPlaylistToSaveMusicResponse(playlistSelected.contains(playlist)));
        }

        return GetPlaylistsToSaveMusicResponse.builder()
                .playlists(getPlaylistsToSaveMusicResponse)
                .build();
    }
}