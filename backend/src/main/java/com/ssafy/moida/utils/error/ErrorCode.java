package com.ssafy.moida.utils.error;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* [세은] 404 NOT_FOUND : DATA를 찾을 수 없음 */
    DATA_NOT_FOUND(NOT_FOUND, "일치하는 데이터가 없습니다."),

    /* [세은] 401 UNAUTHORIZED : 권한이 없는 요청이 들어온 경우 */
    UNAUTHORIZED_USER(UNAUTHORIZED, "권한이 없는 요청입니다."),

    /* [한선영] 400 BAD_REQUEST : 클라이언트의 요청이 유효하지 않아 더 이상 작업을 진행하지 않는 경우 */
    INVALID_PASSWORD(BAD_REQUEST, "유효하지 않은 비밀번호입니다."),

    /* [한선영] 404 NOT_FOUND : Resource를 찾을 수 없음 */
    MEMBER_NOT_FOUND(NOT_FOUND, "해당 유저 정보를 찾을 수 없습니다"),

    /* [한선영] 409 CONFLICT : 클라이언트의 요청이 서버 상태와 충돌하는 경우 */
    DUPLICATE_RESOURCE(CONFLICT, "데이터가 이미 존재합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
