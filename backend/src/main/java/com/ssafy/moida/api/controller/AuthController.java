package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.common.LoginDto;
import com.ssafy.moida.api.common.TokenDto;
import com.ssafy.moida.config.jwt.JwtProperties;
import com.ssafy.moida.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="회원인증")
@Slf4j
@RestController
@RequestMapping("/")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "로그인", description = "로그인을 합니다.")
    @PostMapping(
            path = "/login"
    )
    public ResponseEntity<?> login(
            HttpServletResponse response,
            @RequestBody LoginDto loginDto
    ) {
        // 로그인 정보를 주고 Spring Security를 사용하여 이메일이 존재하는지, 비밀번호가 일치하는지 검증 후 모두 일치하면 토큰 발급
        TokenDto token = authService.login(loginDto);

        // 발급한 토큰을 헤더에 담아서 전달
        response.setHeader(JwtProperties.AUTHORIZATION_HEADER,token.getGrantType() + token.getAccessToken()); // AccessToken
        response.setHeader(JwtProperties.REFRESH_HEADER,token.getGrantType() + token.getRefreshToken()); // RefreshToekn

        return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
    }

    // 로그아웃


}
