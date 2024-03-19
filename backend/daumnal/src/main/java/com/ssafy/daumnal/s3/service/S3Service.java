package com.ssafy.daumnal.s3.service;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.music.entity.Playlist;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    void delete(String url);
    String uploadDiaryPhoto(MultipartFile diaryPhotoFile);

    String uploadPlaylistCover(MultipartFile playlistCoverFile, Playlist playlist);
}