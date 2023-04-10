package com.ssafy.moida.config.jwt;

public interface JwtProperties {
    String SECRET = "jikumjikum project wild animal winwin c207 backend"; //secret key
    String TOKEN_PREFIX = "Bearer "; //Token 앞에 붙는 prefix
    String AUTHORIZATION_HEADER = "Authorization"; //Header Key
    String REFRESH_HEADER = "Refresh";
}
