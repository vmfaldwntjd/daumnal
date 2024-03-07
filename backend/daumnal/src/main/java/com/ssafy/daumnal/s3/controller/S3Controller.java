package com.ssafy.daumnal.s3.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload/diaryPhoto")
    public ApiResponse<?> uploadDiaryPhoto(@RequestParam MultipartFile diaryPhotoFile) {
        String diaryPhotoUrl = s3Service.uploadDiaryPhoto(diaryPhotoFile);

        return ApiResponse.success(SuccessCode.UPLOAD_DIARY_PHOTO, diaryPhotoUrl);
    }

    @PostMapping("/upload/playlistCover")
    public ApiResponse<?> uploadPlaylistCover(@RequestParam MultipartFile playlistCoverFile) {
        String playlistCoverUrl = s3Service.uploadPlaylistCover(playlistCoverFile);

        return ApiResponse.success(SuccessCode.UPLOAD_PLAYLIST_COVER, playlistCoverUrl);
    }
}