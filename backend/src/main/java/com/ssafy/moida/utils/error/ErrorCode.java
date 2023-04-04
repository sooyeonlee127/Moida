package com.ssafy.moida.utils.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* [세은] 400 BAD_REQUEST : 클라이언트의 요청이 유효하지 않아 더 이상 작업을 진행하지 않는 경우 */
    EXCEED_MAX_CAPACITY(BAD_REQUEST, "봉사 신청 인원을 초과하였습니다."),
    EXCEED_USER_POINT(BAD_REQUEST, "사용자 보유 금액보다 기부 금액이 더 큽니다."),
    /* [세은] 401 UNAUTHORIZED : 클라이언트가 요청한 리소스에 대한 인증 정보가 없거나 잘못된 경우 */
    INVALID_CLIENT_TOKEN(UNAUTHORIZED, "유효하지 않은 클라이언트 토큰입니다."),
    INVALID_AUTH_CODE(UNAUTHORIZED, "클라이언트가 요청한 인증 코드가 데이터 리소스와 일치하지 않습니다."),
    /* [새은] 403 FORBIDDEN : 클라이언트가 요청한 리소스에 대한 권한이 없는 경우 */
    FORBIDDEN_USER(FORBIDDEN, "권한이 없는 요청입니다."),
    /* [세은] 404 NOT_FOUND : DATA를 찾을 수 없음 */
    DATA_NOT_FOUND(NOT_FOUND, "일치하는 데이터가 없습니다."),
    CATEGORY_NOT_FOUND(NOT_FOUND, "유효하지 않은 카테고리 값입니다."),
    STATUS_NOT_FOUND(NOT_FOUND, "유효하지 않은 상태 값입니다."),
    SORT_NOT_FOUND(NOT_FOUND, "유효하지 않은 정렬 값입니다."),
    /*[세은] 409 CONFLICT : */
    DUPLICATE_VOLUNTEER_REGISTER(CONFLICT, "해당 일자에 이미 봉사를 신청하였습니다."),
    DUPLICATE_BOARD_EXISTS(CONFLICT, "해당 프로젝트에 이미 생성된 공지사항이 존재합니다."),
    DUPLICATE_ARTICLE_EXISTS(CONFLICT, "해당 사용자의 봉사 내역에 이미 생성된 인증글이 존재합니다."),
    INVALID_DTO_STATUS(CONFLICT, "서버 동작 상태와 클라이언트 요청 상태가 일치하지 않아 작업을 처리할 수 없습니다."),
    INVALID_DONATION_PERIOD(CONFLICT, "기부가 가능한 프로젝트가 아닙니다(현재 날짜가 기부 가능한 날짜가 아님)."),

    /* [한선영] 400 BAD_REQUEST : 클라이언트의 요청이 유효하지 않아 더 이상 작업을 진행하지 않는 경우 */
    INVALID_PASSWORD(BAD_REQUEST, "유효하지 않은 비밀번호입니다."),
    INVALID_REFRESH_TOKEN(BAD_REQUEST, "리프레시 토큰이 유효하지 않습니다"),
    MISMATCH_REFRESH_TOKEN(BAD_REQUEST, "리프레시 토큰의 유저 정보가 일치하지 않습니다"),
    INVALID_POINT(UNPROCESSABLE_ENTITY, "입력한 포인트가 음수이거나 변수의 범위를 넘었습니다."),
    USER_TICKET_LACK(BAD_REQUEST, "사용자가 보유한 티켓이 없습니다."),
    NFT_NOT_FOUND(BAD_REQUEST, "사용자가 소유하고 있지 않은 NFT입니다."),

    /* [한선영] 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(NOT_FOUND, "해당 유저 정보를 찾을 수 없습니다"),
    REFRESH_TOKEN_NOT_FOUND(NOT_FOUND, "로그아웃 된 사용자입니다"),

    /* [한선영] 409 CONFLICT : 클라이언트의 요청이 서버 상태와 충돌하는 경우 */
    DUPLICATE_RESOURCE(CONFLICT, "데이터가 이미 존재합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
