package com.ssafy.daumnal.s3.service;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.music.entity.Playlist;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    String uploadDiaryPhoto(MultipartFile diaryPhotoFile, Diary diary);

    String uploadPlaylistCover(MultipartFile playlistCoverFile, Playlist playlist);
}