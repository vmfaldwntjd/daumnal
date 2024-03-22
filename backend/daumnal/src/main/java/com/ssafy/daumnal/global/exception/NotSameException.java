package com.ssafy.daumnal.global.exception;

import com.ssafy.daumnal.global.constants.ErrorCode;

import lombok.Getter;

@Getter
public class NotSameException extends RuntimeException {

	private final ErrorCode code;

	public NotSameException(ErrorCode code) {
		super(code.getMessage());
		this.code = code;
	}
}