package com.ssafy.moida.service.auth;

import com.ssafy.moida.api.common.LoginDto;
import com.ssafy.moida.api.common.TokenDto;
import com.ssafy.moida.config.jwt.JwtTokenProvider;
import com.ssafy.moida.repository.user.UserRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 회원 인증 - 회원 DB 테이블 사이의 브릿지
 * */

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, AuthenticationManagerBuilder authenticationManagerBuilder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * [한선영] 로그인
     * @param loginDto
     * @return tokenDto
     * */
    public TokenDto login(LoginDto loginDto) {
        /*
        * 아이디, 비밀번호를 통한 인증에서 Authentication은 UsernamePasswordAuthenticationToken 구현체로 표현됨
        * 로그인을 시도한 아이디, 비밀번호를 저장한 Authentication 생성
        * */
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(usernamePasswordAuthenticationToken);

        // Token 생성
        TokenDto tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        return tokenDto;
    }

    //로그아웃


}
