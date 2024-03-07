package com.ssafy.daumnal.backgroundmusic.service.impl;

import com.ssafy.daumnal.backgroundmusic.repository.BackgroundMusicRepository;
import com.ssafy.daumnal.backgroundmusic.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BackgroundMusicServiceImpl implements BackgroundMusicService {

    private final BackgroundMusicRepository backgroundMusicRepository;
}