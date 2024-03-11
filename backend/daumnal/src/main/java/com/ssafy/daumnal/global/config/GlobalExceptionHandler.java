package com.ssafy.daumnal.global.config;

import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ApiResponse<?> handleNoExistException(NoExistException e) {

        return ApiResponse.error(e.getCode());
    }

    @ExceptionHandler
    public ApiResponse<?> handleExistException(ExistException e) {

        return ApiResponse.error(e.getCode());
    }

    @ExceptionHandler
    public ApiResponse<?> handleInvalidException(InvalidException e) {

        return ApiResponse.error(e.getCode());
    }
}