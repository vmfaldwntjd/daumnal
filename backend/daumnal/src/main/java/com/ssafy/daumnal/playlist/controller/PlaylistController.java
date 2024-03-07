package com.ssafy.daumnal.playlist.controller;

import com.ssafy.daumnal.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;
}