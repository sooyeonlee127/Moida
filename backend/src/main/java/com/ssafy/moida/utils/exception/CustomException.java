package com.ssafy.moida.utils.exception;

import com.ssafy.moida.utils.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * [세은] 상황에 따른 예외처리
 */
@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private final ErrorCode errorCode;
}
