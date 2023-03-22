package com.ssafy.moida.config;

import com.ssafy.moida.config.jwt.JwtAccessDeniendHandeler;
import com.ssafy.moida.config.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.moida.config.jwt.JwtSecurityConfig;
import com.ssafy.moida.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Spring Security Config
 * [Spring Security 설정 파일]
 */

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 401 error(Unauthorized, 인증 자격 증명 불가) 처리
    private final JwtAccessDeniendHandeler jwtAccessDeniendHandeler; // 403 error(Forbidden, 권한 없음) 처리
    private final JwtTokenProvider jwtTokenProvider; //JWT 토큰 생성 관리

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration(); //Cors 설정
        config.setAllowCredentials(true); // 서버 응답시 json 을 자바스크립트에서 처리할 수 있음
        config.addAllowedOriginPattern("*"); // 모든 ip 에 응답 허용
        config.addAllowedHeader("*"); // 모든 header 응답 허용
        config.addExposedHeader("*");
        config.addAllowedMethod("*"); // 모든 요청 메소드 응답 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                    .disable() // 위조 인증 요청 방지
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //JWT 토큰 사용하기 때문에 session 사용 안함

                .and()
                .httpBasic().
                    disable() // HTTP Basic Authentication 사용 안함
                .formLogin()
                    .disable() // Form Based Authentication 사용 안함
                .addFilter(corsFilter()) // 커스텀 필터(corsFilter) 추가
                .exceptionHandling() // 예외처리 기능 사용
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 401 error(Unauthorized) 처리
                .accessDeniedHandler(jwtAccessDeniendHandeler) // 403 error(Forbidden) 처리
                .and()
                .apply(new JwtSecurityConfig(jwtTokenProvider)) // 사용자 정의 API(JWT 토큰 관련 처리) 추가

                .and()
                .authorizeHttpRequests() // 요청에 대한 권한 인증 필요
                    .requestMatchers("/").permitAll() //나머지 설정은 API 다 나오면 계속 진행 예정
                    .anyRequest().permitAll(); // 이외의 다른 요청들 모든 페이지 접근 가능

        return http.build();
    }



}
