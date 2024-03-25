package com.ssafy.daumnal.emotion.util;

import com.ssafy.daumnal.global.exception.InvalidException;
import org.springframework.stereotype.Component;

import static com.ssafy.daumnal.emotion.constants.EmotionConstants.NUMBER_REGEX;
import static com.ssafy.daumnal.global.constants.ErrorCode.INVALID_DIARY_EMOTION_ID;

@Component
public class EmotionUtilService {

    public void validateEmotionIdNumber(String emotionId) {
        if (!emotionId.matches(NUMBER_REGEX)){
            throw new InvalidException(INVALID_DIARY_EMOTION_ID);
        }
    }
}
