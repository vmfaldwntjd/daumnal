package com.ssafy.daumnal.s3.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.global.constants.ErrorCode;
import com.ssafy.daumnal.music.entity.Playlist;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;

    /**
     * s3에 파일 (이미지 등) 업로드
     *
     * @param file 업로드할 파일
     * @param path 파일을 업로드할 경로
     * @return 업로드한 파일 url
     * @throws IOException
     */
    public String upload(MultipartFile file, String path) throws IOException {
        String fileName = getFileUuidName(
                Objects.requireNonNull(file.getOriginalFilename(), ErrorCode.NOT_EXISTS_FILE.getMessage())
        );
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        //S3에 파일 업로드
        amazonS3Client.putObject(
                //외부에 공개하는 파일인 경우 Public Read 권한을 추가
                new PutObjectRequest(bucket, path + "/" + fileName, file.getInputStream(), metadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        return amazonS3Client.getUrl(bucket, path + "/" + fileName).toString();
    }

    /**
     * s3에 업로드된 파일 삭제
     *
     * @param url s3에 업로드된 파일 url
     */
    @Override
    public void delete(String url) {
        String fileName = url.split("https://" + bucket + ".s3." + region + ".amazonaws.com/")[1];
        if (amazonS3Client.doesObjectExist(bucket, fileName)) {
            amazonS3Client.deleteObject(bucket, fileName);
        }
    }

    /**
     * s3에 일기 내용 중 사진 업로드
     *
     * @param diaryPhotoFile 업로드할 일기 사진 파일
     * @return
     */
    @Override
    public String uploadDiaryPhoto(MultipartFile diaryPhotoFile) {
        try {
            return upload(diaryPhotoFile, "diaryPhoto");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * s3에 플레이리스트 커버 업로드
     *
     * @param playlistCoverFile 업로드할 플레이리스트 커버 파일
     * @param playlist 커버를 저장할 플레이리스트 인스턴스
     * @return
     */
    @Override
    public String uploadPlaylistCover(MultipartFile playlistCoverFile, Playlist playlist) {
        try {
            if (playlist != null && playlist.getCoverUrl() != null &&
                    playlist.getCoverUrl().contains(String.format("https://%s.s3.%s.amazonaws.com/", bucket, region))) {
                delete(playlist.getCoverUrl());
            }

            return upload(playlistCoverFile, "playlistCover");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * uuid를 이용해 파일 이름 만들기
     *
     * @param fileName 파일 기존 이름
     * @return uuid를 이용해 만들어진 파일 이름
     */
    public String getFileUuidName(String fileName) {

        return UUID.randomUUID() + fileName.substring(fileName.lastIndexOf('.'));
    }
}