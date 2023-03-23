package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.common.LoginDto;
import com.ssafy.moida.api.common.TokenDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.config.jwt.JwtProperties;
import com.ssafy.moida.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name="회원인증")
@Slf4j
@RestController
@RequestMapping("/")
public class AuthController {

    private final AuthService authService;

    private final RedisTemplate redisTemplate;

    public AuthController(AuthService authService, RedisTemplate redisTemplate) {
        this.authService = authService;
        this.redisTemplate = redisTemplate;
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
    @Operation(summary = "로그아웃", description = "로그아웃을 합니다.")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal PrincipalDetails principal, HttpServletRequest request) {

        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();

        log.info("access : {}", request.getHeader("Authorization"));
        log.info("refresh : {}", request.getHeader("Refresh"));

        String jwt = authService.resolveToken(request, JwtProperties.AUTHORIZATION_HEADER);
        String refresh = authService.resolveToken(request, JwtProperties.REFRESH_HEADER);

        if (jwt == null || refresh == null) {
            return new ResponseEntity<>("로그아웃 실패", HttpStatus.BAD_REQUEST);
        }

        logoutValueOperations.set(jwt, jwt);
        logoutValueOperations.set(refresh, refresh);

        log.info("로그아웃 유저 이메일 : '{}'", principal.getUsername());
        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }


}
