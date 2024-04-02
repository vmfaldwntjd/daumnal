package com.ssafy.daumnal.global.exception;

import com.ssafy.daumnal.global.constants.ErrorCode;
import lombok.Getter;

@Getter
public class ServerException extends RuntimeException {

    private final ErrorCode code;

    public ServerException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}