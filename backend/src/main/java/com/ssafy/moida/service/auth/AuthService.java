package com.ssafy.moida.service.auth;

import com.ssafy.moida.api.common.LoginDto;
import com.ssafy.moida.api.common.TokenDto;
import com.ssafy.moida.config.jwt.JwtProperties;
import com.ssafy.moida.config.jwt.JwtTokenProvider;
import com.ssafy.moida.model.user.RefreshRedisToken;
import com.ssafy.moida.repository.user.RefreshRedisRepository;
import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
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
    private final RefreshRedisRepository refreshRedisRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;


    public AuthService(UserRepository userRepository, RefreshRedisRepository refreshRedisRepository, AuthenticationManagerBuilder authenticationManagerBuilder, JwtTokenProvider jwtTokenProvider, RedisTemplate redisTemplate) {
        this.userRepository = userRepository;
        this.refreshRedisRepository = refreshRedisRepository;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisTemplate = redisTemplate;
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

        // Redis에 refreshToken 저장
        RefreshRedisToken newRedisToken = RefreshRedisToken.createToken(authentication.getName(), tokenDto.getRefreshToken());
        refreshRedisRepository.save(newRedisToken);

        return tokenDto;
    }

    public String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if (bearerToken != null && bearerToken.startsWith(JwtProperties.TOKEN_PREFIX)) {
            return bearerToken.substring(JwtProperties.TOKEN_PREFIX.length());
        }
        return null;
    }

    @Transactional
    public TokenDto reissueAccessToken(TokenDto tokenDto) {
        // refresh token 검증해서 false라면 유효하지 않은 token
        if (!jwtTokenProvider.validateToken(tokenDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 토큰 인증 및 사용자 정보를 authentication로 담기
        Authentication authentication = jwtTokenProvider.getAuthentication(tokenDto.getAccessToken());

        // 유저를 찾아서 가지고 있는지 확인해서 없다면 에러 발생
        RefreshRedisToken refreshRedisToken = refreshRedisRepository.findById(authentication.getName())
                .orElseThrow(() -> new CustomException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));

        // refresh token이 유저에 저장된 refresh token과 다르면 에러 발생
        if (!refreshRedisToken.getToken().equals(tokenDto.getRefreshToken())) {
            throw new CustomException(ErrorCode.MISMATCH_REFRESH_TOKEN);
        }

        // 이전 정보 지우기
        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(tokenDto.getAccessToken(), tokenDto.getAccessToken());

        // 토큰 새로 생성
        tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        // Redis에 refreshToken 저장
        RefreshRedisToken newRedisToken = RefreshRedisToken.createToken(authentication.getName(), tokenDto.getRefreshToken());
        refreshRedisRepository.save(newRedisToken);

        return tokenDto;
    }

}
