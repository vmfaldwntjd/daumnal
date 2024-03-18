package com.ssafy.daumnal.diary.service.impl;

import com.ssafy.daumnal.diary.repository.DiaryRepository;
import com.ssafy.daumnal.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
}