package com.ssafy.daumnal.diary.util;

import com.ssafy.daumnal.diary.dto.DiaryDTO.DiaryEmotion;
import org.springframework.stereotype.Component;

@Component
public class DiaryUtilService {


    public boolean allEmotionsExist(DiaryEmotion diaryEmotion) {
        return diaryEmotion.getAngry() != null &&
                diaryEmotion.getFear() != null &&
                diaryEmotion.getDisgust() != null &&
                diaryEmotion.getSadness() != null &&
                diaryEmotion.getSurprise() != null &&
                diaryEmotion.getNeutral() != null &&
                diaryEmotion.getHappiness() != null;
    }
}
