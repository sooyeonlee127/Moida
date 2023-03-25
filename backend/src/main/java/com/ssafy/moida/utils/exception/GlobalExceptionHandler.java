package com.ssafy.moida.utils.exception;

import com.ssafy.moida.utils.error.ErrorCode;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

/**
 * [세은] 클라이언트에게 보낼 에러, 코드, 상태, 메세지 핸들러
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(CustomException ex){
        ErrorCode errorCode = ex.getErrorCode();
        String errorMessage = errorCode.getMessage();

        Map<String, Object> response = new HashMap<>();

        response.put("error", errorCode.getHttpStatus().name());
        response.put("code", errorCode.name());
        response.put("status", errorCode.getHttpStatus().value());
        response.put("message", errorMessage);

        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {

        Map<String, Object> response = new HashMap<>();

        response.put("error", HttpStatus.BAD_REQUEST);
        response.put("code", "INVALID_CLIENT_INPUT");
        response.put("status", "400");
        response.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }
}
