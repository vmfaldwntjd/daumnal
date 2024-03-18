package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.music.repository.MusicRepository;
import com.ssafy.daumnal.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
}