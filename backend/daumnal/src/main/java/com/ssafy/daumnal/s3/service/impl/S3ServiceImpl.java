package com.ssafy.daumnal.s3.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    /**
     * s3에 일기 내용 중 사진 업로드
     *
     * @param diaryPhotoFile 업로드할 일기 사진 파일
     * @param diary 일기 사진이 저장되어있을 일기 인스턴스
     * @return
     */
    @Override
    public String uploadDiaryPhoto(MultipartFile diaryPhotoFile, Diary diary) {
        try {
            if (diary.getPhotoUrl() != null && diary.getPhotoUrl().contains(String.format("https://%s.s3.%s.amazonaws.com/", bucket, region))) {
                delete(diary.getPhotoUrl());
            }

            return upload(diaryPhotoFile, "diaryPhoto");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String uploadPlaylistCover(MultipartFile playlistCoverFile, Playlist playlist) {
        return null;
    }
}