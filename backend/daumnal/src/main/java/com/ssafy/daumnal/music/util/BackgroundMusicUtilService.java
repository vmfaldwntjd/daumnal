package com.ssafy.daumnal.music.util;

import com.ssafy.daumnal.global.exception.InvalidException;
import org.springframework.stereotype.Component;

import static com.ssafy.daumnal.global.constants.ErrorCode.INVALID_BACKGROUND_MUSIC_ID;
import static com.ssafy.daumnal.music.constants.BackgroundMusicConstants.NUMBER_REGEX;

@Component
public class BackgroundMusicUtilService {

    public void validateBackgroundMusicIdNumber(String backgroundMusicId) {
        if (!backgroundMusicId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_BACKGROUND_MUSIC_ID);
        }
    }
}
