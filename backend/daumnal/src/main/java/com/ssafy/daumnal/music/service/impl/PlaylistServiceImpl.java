package com.ssafy.daumnal.music.service.impl;

import com.ssafy.daumnal.music.repository.PlaylistRepository;
import com.ssafy.daumnal.music.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
}