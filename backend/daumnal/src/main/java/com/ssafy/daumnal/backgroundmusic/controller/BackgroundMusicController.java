package com.ssafy.daumnal.backgroundmusic.controller;

import com.ssafy.daumnal.backgroundmusic.service.BackgroundMusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/background-musics")
public class BackgroundMusicController {

    private final BackgroundMusicService backgroundMusicService;
}