package com.ssafy.daumnal.global.exception;

import com.ssafy.daumnal.global.constants.ErrorCode;
import lombok.Getter;

@Getter
public class LimitExceededException extends RuntimeException {

    private final ErrorCode code;

    public LimitExceededException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}