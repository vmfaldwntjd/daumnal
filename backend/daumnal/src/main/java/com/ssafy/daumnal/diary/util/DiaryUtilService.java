package com.ssafy.daumnal.diary.util;

import com.ssafy.daumnal.emotion.dto.EmotionDTO.DiaryEmotion;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Objects;

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
        int diaryContentLength = diaryContent.length();

        if (diaryContentLength > CONTENT_MAX_LENGTH ||
                diaryContentLength < CONTENT_MIN_LENGTH) {
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
        
        if (tags.length == 1 && tags[0].isEmpty()) {
            return;
        }

        for (String tag : tags) {
            if (!tag.matches(HASH_TAG_REGEX)) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_WORDS);
            }

            if (tag.length() > HASH_TAG_MAX_LENGTH) {
                throw new InvalidException(INVALID_DIARY_HASHTAG_LENGTH);
            }
        }
    }

    /**
     * 일기 year 정보를 입력 받았는지 확인
     *
     * @param year
     */
    public void validateExistsDiaryYearInput(String year) {
        if (Objects.isNull(year)) {
            throw new NoExistException(NOT_EXISTS_DIARY_YEAR_INPUT);
        }
    }

    /**
     * 일기 month 정보를 입력 받았는지 확인
     *
     * @param month
     */
    public void validateExistsDiaryMonthInput(String month) {
        if (Objects.isNull(month)) {
            throw new NoExistException(NOT_EXISTS_DIARY_MONTH_INPUT);
        }
    }

    /**
     * year 정보가 숫자인지 확인하기
     *
     * @param year
     */
    public void validateDiaryYearInput(String year) {
        if (!year.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_DIARY_YEAR_INPUT);
        }
    }

    /**
     * month 정보가 숫자인지 확인하기
     *
     * @param month
     */
    public void validateDiaryMonthInput(String month) {
        if (!month.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_DIARY_MONTH_INPUT);
        }
    }

    /**
     * 일기 id를 자연수로 입력했는지 확인하기
     *
     * @param diaryId
     */
    public void validateDiaryIdNumber(String diaryId) {
        if (!diaryId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_DIARY_ID);
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
