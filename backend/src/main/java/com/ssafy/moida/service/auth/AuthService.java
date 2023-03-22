package com.ssafy.moida.service.auth;

import com.ssafy.moida.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 회원 인증 - 회원 DB 테이블 사이의 브릿지
 * */

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //로그인

    //로그아웃


}
