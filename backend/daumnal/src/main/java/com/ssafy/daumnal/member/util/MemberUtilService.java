package com.ssafy.daumnal.member.util;

import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.member.entity.SocialProvider;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import static com.ssafy.daumnal.global.constants.ErrorCode.*;
import static com.ssafy.daumnal.member.constants.MemberConstants.*;

@Component
public class MemberUtilService {

    /**
     * socialId가 null인지 확인하기
     * @param socialId
     */
    public void validateExistsSocialId(String socialId) {
        if (socialId == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_ID);
        }
    }


    /**
     * socialId가 자연수 형태인지 확인하기
     * @param socialId
     */
    public void validateSocialIdNumber(String socialId) {
        if (!socialId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_ID);
        }
    }


    /**
     * socialProvider가 null인지 확인하기
     * @param socialProvider
     */
    public void validateExistsSocialProvider(String socialProvider) {
        if (socialProvider == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_SOCIAL_PROVIDER);
        }
    }

    /**
     * socialProvider가 카카오인지, 네이버인지 검증하기
     * @param socialProvider
     */
    public void validateSocialProvider(String socialProvider) {
        if (!(KAKAO.equals(socialProvider) || NAVER.equals(socialProvider))) {
            throw new InvalidException(INVALID_MEMBER_SOCIAL_PROVIDER);
        }
    }

    /**
     * memberId의 값이 자연수인지 검증하기
     * @param memberId
     */
    public void validateMemberIdNumber(String memberId) {
        if (!memberId.matches(NUMBER_REGEX)) {
            throw new InvalidException(INVALID_MEMBER_ID);
        }
    }

    /**
     * 회원탈퇴 상태 검증
     * @param memberStatus
     */
    public void validateMemberStatusNotDelete(int memberStatus) {
        if (memberStatus == MEMBER_DELETE) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_DELETE);
        }
    }

    /**
     * 로그아웃 상태 검증
     * @param memberStatus
     */
    public void validateMemberStatusNotLogout(int memberStatus) {
        if (memberStatus == MEMBER_LOGOUT) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_LOGOUT);
        }
    }

    /**
     * 재로그인 한 상황 검증
     * @param memberStatus
     */
    public void validateMemberStatusReLogin(int memberStatus) {
        if (memberStatus == MEMBER_LOGIN) {
            throw new InvalidException(INVALID_MEMBER_STATUS_ON_LOGIN);
        }
    }

    /**
     * 닉네임 입력 검증하기
     * @param nickname
     */
    public void validateInputMemberNickname(String nickname) {
        if (nickname == null) {
            throw new NoExistException(NOT_EXISTS_MEMBER_NICKNAME_INPUT);
        }

        if (!(nickname.matches(ENGLISH_REGEX) || nickname.matches(KOREAN_REGEX))) {
            throw new InvalidException(INVALID_MEMBER_NICKNAME_WORDS);
        }

        if (nickname.length() > NICKNAME_MAX_LENGTH) {
            throw new InvalidException(INVALID_MEMBER_NICKNAME_LENGTH);
        }
    }

    /**
     * 제공된 문자열 형태의 socialProvider를 알맞은 SocialProvider 객체 형태로 반환해줍니다.
     * @param socialProvider
     * @return
     */
    public SocialProvider getProvider(String socialProvider) {

        SocialProvider providerResult = null;

        if (socialProvider.equals(KAKAO)) {
            providerResult = SocialProvider.KAKAO;
        } else if (socialProvider.equals(NAVER)) {
            providerResult = SocialProvider.NAVER;
        }

        return providerResult;
    }

    /**
     * 닉네임 입력했는지 확인하기
     * @param nickname
     */
    public void validateNicknameEmpty(String nickname) {
        if (!StringUtils.hasText(nickname)) {
            throw new InvalidException(NOT_EXISTS_MEMBER_NICKNAME_GET);
        }
    }

    /**
     * 초기에 닉네임 등록한 회원인지 확인하기
     * @param originNickname
     */
    public void validateExistsInitialNickname(String originNickname) {
        if (!StringUtils.hasText(originNickname)) {
            throw new NoExistException(NOT_EXISTS_MEMBER_NICKNAME_INIT_GET);
        }
    }
}
