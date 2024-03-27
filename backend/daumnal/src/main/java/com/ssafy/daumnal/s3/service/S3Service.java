package com.ssafy.daumnal.s3.service;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.global.constants.S3Path;
import com.ssafy.daumnal.music.entity.Playlist;
import org.springframework.web.multipart.MultipartFile;

public interface S3Service {

    void delete(String url);

    String upload(MultipartFile file, S3Path path);
}