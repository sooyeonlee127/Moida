package com.ssafy.moida.config.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * [JWT Security 설정 파일]
 * */

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtTokenProvider jwtTokenProvider; //JWT 토큰 생성 관리

    @Override
    public void configure(HttpSecurity builder) {
        JwtFilter jwtTokenFilter = new JwtFilter(jwtTokenProvider); // 커스텀 필터인 JwtFilter 생성
        builder.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class); // 지정된 필터 앞에 커스텀 필터 추가(먼저 실행)
    }

}
