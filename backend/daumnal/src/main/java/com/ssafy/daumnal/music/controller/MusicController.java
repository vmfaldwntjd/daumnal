package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/musics")
public class MusicController {

    private final MusicService musicService;
}