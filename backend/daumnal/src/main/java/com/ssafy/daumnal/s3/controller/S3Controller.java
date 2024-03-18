package com.ssafy.daumnal.s3.controller;

import com.ssafy.daumnal.global.constants.SuccessCode;
import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class S3Controller {

    private final S3Service s3Service;

//    @PostMapping("/diaryPhoto")
//    public ApiResponse<?> uploadDiaryPhoto(@ModelAttribute MultipartFile diaryPhotoFile) {
//        String diaryPhotoUrl = s3Service.uploadDiaryPhoto(diaryPhotoFile, null);
//
//        return ApiResponse.success(SuccessCode.UPLOAD_DIARY_PHOTO, diaryPhotoUrl);
//    }

//    @PostMapping("/playlistCover")
//    public ApiResponse<?> uploadPlaylistCover(@ModelAttribute MultipartFile playlistCoverFile) {
//        String playlistCoverUrl = s3Service.uploadPlaylistCover(playlistCoverFile, null);
//
//        return ApiResponse.success(SuccessCode.UPLOAD_PLAYLIST_COVER, playlistCoverUrl);
//    }
}