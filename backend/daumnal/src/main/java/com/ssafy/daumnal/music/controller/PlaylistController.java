package com.ssafy.daumnal.music.controller;

import com.ssafy.daumnal.music.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playlists")
@CrossOrigin("*")
public class PlaylistController {

    private final PlaylistService playlistService;
}