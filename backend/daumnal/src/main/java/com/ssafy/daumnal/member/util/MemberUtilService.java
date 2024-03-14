package com.ssafy.daumnal.member.util;

import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import org.springframework.stereotype.Component;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.member.constants.MemberConstants.*;

@Component
public class MemberUtilService {

    // socialId가 null인지 확인하기
    public void validateExistsSocialId(String socialId) {
        if (socialId == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_ID);
        }
    }

    // socialId가 자연수 형태인지 확인하기
    public void validateSocialIdNumber(String socialId) {
        if (!socialId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_ID);
        }
    }

    // socialProvider가 null인지 확인하기
    public void validateExistsSocialProvider(String socialProvider) {
        if (socialProvider == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_PROVIDER);
        }
    }

    // socialProvider가 카카오인지, 네이버인지 검증하기
    public void validateSocialProvider(String socialProvider) {
        if (!(KAKAO.equals(socialProvider) || NAVER.equals(socialProvider))) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_PROVIDER);
        }
    }

    //
}
