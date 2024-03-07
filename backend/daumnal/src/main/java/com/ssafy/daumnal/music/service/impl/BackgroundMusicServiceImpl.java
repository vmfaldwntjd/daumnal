package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.music.repository.BackgroundMusicRepository;
import com.ssafy.daumnal.music.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BackgroundMusicServiceImpl implements BackgroundMusicService {

    private final BackgroundMusicRepository backgroundMusicRepository;
}