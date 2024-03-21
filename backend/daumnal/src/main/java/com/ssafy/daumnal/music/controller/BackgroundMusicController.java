package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.music.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/background-musics")
public class BackgroundMusicController {

    private final BackgroundMusicService backgroundMusicService;
}