package com.ssafy.daumnal.global.config;

import com.ssafy.daumnal.global.dto.ApiResponse;
import com.ssafy.daumnal.global.exception.ExistException;
import com.ssafy.daumnal.global.exception.InvalidException;
import com.ssafy.daumnal.global.exception.NoExistException;
import com.ssafy.daumnal.global.exception.NotSameException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ApiResponse<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        String type = String.valueOf(e.getRequiredType());

        return ApiResponse.error(BAD_REQUEST, type.substring(type.lastIndexOf('.') + 1) +
                " 타입 " + e.getName() + " 입력 형식이 올바르지 않습니다! (입력값 : " + e.getValue() + ")");
    }

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

    @ExceptionHandler
    public ApiResponse<?> handleNotSameException(NotSameException e) {

        return ApiResponse.error(e.getCode());
    }
}