package com.ssafy.daumnal.global.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.ssafy.daumnal.global.constants.ErrorCode;
import com.ssafy.daumnal.global.constants.SuccessCode;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@JsonPropertyOrder({"code", "status", "message", "data"})
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ApiResponse<T> {

    private final int code;
    private final HttpStatus status;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    public static <T> ApiResponse<T> success(SuccessCode code) {
        return new ApiResponse<>(code.getStatus().value(), code.getStatus(), code.getMessage());
    }

    public static <T> ApiResponse<T> success(SuccessCode code, T data) {
        return new ApiResponse<>(code.getStatus().value(), code.getStatus(), code.getMessage(), data);
    }

    public static <T> ApiResponse<T> error(ErrorCode code) {
        return new ApiResponse<>(code.getStatus().value(), code.getStatus(), code.getMessage());
    }

    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(status.value(), status, message);
    }
}