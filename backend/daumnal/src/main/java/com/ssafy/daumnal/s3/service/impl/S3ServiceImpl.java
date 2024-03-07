package com.ssafy.daumnal.s3.service.impl;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.s3.service.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class S3ServiceImpl implements S3Service {

    @Override
    public String uploadDiaryPhoto(MultipartFile diaryPhotoFile, Diary diary) {
        return null;
    }

    @Override
    public String uploadPlaylistCover(MultipartFile playlistCoverFile, Playlist playlist) {
        return null;
    }
}