package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.repository.MemberRepository;
import com.ssafy.daumnal.member.util.MemberUtilService;
import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackGroundMusicResponse;
import com.ssafy.daumnal.music.dto.BackgroundMusicDTO.GetBackgroundMusicsResponse;
import com.ssafy.daumnal.music.entity.BackgroundMusic;
import com.ssafy.daumnal.music.repository.BackgroundMusicRepository;
import com.ssafy.daumnal.music.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.daumnal.global.constants.ErrorCode.NOT_EXISTS_MEMBER_ID;

@Service
@RequiredArgsConstructor
public class BackgroundMusicServiceImpl implements BackgroundMusicService {

    private final BackgroundMusicRepository backgroundMusicRepository;
    private final MemberRepository memberRepository;
    private final MemberUtilService memberUtilService;

    @Override
    public GetBackgroundMusicsResponse getAllBackgroundMusic(String memberId) {
        memberUtilService.validateMemberIdNumber(memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        int status = member.getStatus().getValue();
        memberUtilService.validateMemberStatusNotDelete(status);
        memberUtilService.validateMemberStatusNotLogout(status);

        List<BackgroundMusic> backgroundMusicContents = backgroundMusicRepository.findAll();
        List<GetBackGroundMusicResponse> backGroundMusics = new ArrayList<>();
        for (BackgroundMusic backgroundMusic : backgroundMusicContents) {
            backGroundMusics.add(new GetBackGroundMusicResponse(
                    String.valueOf(backgroundMusic.getId()),
                    backgroundMusic.getYoutubeId(),
                    backgroundMusic.getTitle(),
                    backgroundMusic.getCategory()
            ));
        }

        return GetBackgroundMusicsResponse.builder()
                .backGroundMusics(backGroundMusics)
                .build();
    }
}