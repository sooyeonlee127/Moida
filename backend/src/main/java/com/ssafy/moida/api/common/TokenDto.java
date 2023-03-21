package com.ssafy.moida.api.common;

import lombok.Builder;

import java.util.Date;

@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private long accessTokenExpiresIn;
    private String refreshToken;

}
