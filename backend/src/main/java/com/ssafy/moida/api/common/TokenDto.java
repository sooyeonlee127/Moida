package com.ssafy.moida.api.common;

import lombok.Builder;

/**
 * [토큰 정보 dto]
 * 인증타입, 엑세스 토큰, 토큰만료시간, 리프레시 토큰
 * */

@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private long accessTokenExpiresIn;
    private String refreshToken;

}
