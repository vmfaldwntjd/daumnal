package com.ssafy.daumnal.playlist.service.impl;

import com.ssafy.daumnal.playlist.repository.PlaylistRepository;
import com.ssafy.daumnal.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;
}