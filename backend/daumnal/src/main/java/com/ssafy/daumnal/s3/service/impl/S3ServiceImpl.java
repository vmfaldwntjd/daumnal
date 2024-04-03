package com.ssafy.daumnal.s3.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.daumnal.global.constants.S3Path;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.exception.ServerException;
import com.ssafy.daumnal.s3.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.global.constants.S3Path.PRODUCTION_SERVER;

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
    @Override
    public String upload(MultipartFile file, S3Path path) {
        if (file == null || file.isEmpty()) {
            throw new NoExistException(NOT_EXISTS_FILE_TO_UPLOAD);
        }
        if (path == null) {
            throw new NoExistException(NOT_EXISTS_FILE_PATH);
        }
        String fileName = getFileUuidName(
                Objects.requireNonNull(file.getOriginalFilename(), NOT_EXISTS_FILE_TO_UPLOAD.getMessage())
        );
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        try {
            //S3에 파일 업로드
            amazonS3Client.putObject(
                    //외부에 공개하는 파일인 경우 Public Read 권한을 추가
                    new PutObjectRequest(bucket, PRODUCTION_SERVER + "/" + path + "/" + fileName, file.getInputStream(), metadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            throw new ServerException(NOT_UPLOADS_FILE);
        }

        return amazonS3Client.getUrl(bucket, PRODUCTION_SERVER + "/" + path + "/" + fileName).toString();
    }

    /**
     * s3에 업로드된 파일 삭제
     *
     * @param url s3에 업로드된 파일 url
     */
    @Override
    public void delete(String url) {
        if (url == null || !url.contains(String.format("https://%s.s3.%s.amazonaws.com/", bucket, region))) {
            throw new InvalidException(INVALID_URL_FORMAT);
        }
        String fileName = url.split("https://" + bucket + ".s3." + region + ".amazonaws.com/")[1];
        if (amazonS3Client.doesObjectExist(bucket, fileName)) {
            amazonS3Client.deleteObject(bucket, fileName);
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