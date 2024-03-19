package com.ssafy.daumnal.diary.util;

import com.ssafy.daumnal.diary.dto.DiaryDTO.DiaryEmotion;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import static com.ssafy.daumnal.diary.constants.DiaryConstants.*;
import static com.ssafy.daumnal.diary.constants.DiaryConstants.HASH_TAG_MAX_LENGTH;
import static com.ssafy.daumnal.global.constants.ErrorCode.*;

@Component
public class DiaryUtilService {

    /**
     * 제목 입력 했는지 확인
     * @param diaryTitle
     */
    public void validateExistsDiaryTitle(String diaryTitle) {
        if (!StringUtils.hasText(diaryTitle)) {
            throw new NoExistException(NOT_EXISTS_DIARY_TITLE_INPUT);
        }
    }

    /**
     * 일기 내용 입력 했는지 확인
     * @param diaryContent
     */
    public void validateExistsDiaryContent(String diaryContent) {
        if (!StringUtils.hasText(diaryContent)) {
            throw new NoExistException(NOT_EXISTS_DIARY_CONTENT_INPUT);
        }
    }

    /**
     * 감정 정보 전부 입력했는지 확인
     * @param diaryEmotion
     */
    public void validateExistAllEmotions(DiaryEmotion diaryEmotion) {
        if (!allEmotionsExist(diaryEmotion)) {
            throw new NoExistException(NOT_EXISTS_DIARY_EMOTION_INPUT);
        }
    }

    /**
     * 일기 내용 길이 확인
     * @param diaryContent
     */
    public void validateDiaryContentLength(String diaryContent) {
        if (diaryContent.length() > CONTENT_MAX_LENGTH) {
            throw new InvalidException(INVALID_DIARY_CONTENT_LENGTH);
        }
    }

    /**
     * 해시 태그 개수 확인
     * @param tags
     */
    public void validateHashTagCount(String[] tags) {
        if (tags.length > HASH_TAG_MAX_COUNT) {
            throw new InvalidException(INVALID_DIARY_HASHTAG_COUNT);
        }
    }

    /**
     * 각 해시태그 입력 방식 올바른지 확인
     * @param tags
     */
    public void validateHashTagInput(String[] tags) {
        for (String tag : tags) {
            if (!tag.matches(HASH_TAG_REGEX)) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_WORDS);
            }

            if (tag.length() > HASH_TAG_MAX_LENGTH) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_LENGTH);
            }
        }
    }

    private boolean allEmotionsExist(DiaryEmotion diaryEmotion) {
        return diaryEmotion.getAngry() != null &&
                diaryEmotion.getFear() != null &&
                diaryEmotion.getDisgust() != null &&
                diaryEmotion.getSadness() != null &&
                diaryEmotion.getSurprise() != null &&
                diaryEmotion.getNeutral() != null &&
                diaryEmotion.getHappiness() != null;
    }
}
