package com.ssafy.moida.service;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.model.Role;
import com.ssafy.moida.model.Users;
import com.ssafy.moida.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * User에 관련된 각종 함수를 처리하는 서비스
 */

@Slf4j
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = null;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 회원가입
    public void JoinUser(UserJoinReqDto userJoinReqDto) {
        //user role 확인
        if(userJoinReqDto.getRole().equals("ROLE_ADMIN")) {
            userJoinReqDto.setRole(Role.valueOf("ROLE_ADMIN"));
        } else {
            userJoinReqDto.setRole(Role.valueOf("ROLE_ADMIN"));
        }

        Users u = Users.builder().email(userJoinReqDto.getEmail())
                .password(bCryptPasswordEncoder.encode(userJoinReqDto.getPassword()))
                .phone(userJoinReqDto.getPhone())
                .nickname(userJoinReqDto.getNickname())
                .ticketCnt(0)
                .point(0L)
                .nftUrl(userJoinReqDto.getNftUrl())
                .walletUrl(userJoinReqDto.getWalletUrl())
                .role(userJoinReqDto.getRole())
                .build();

        userRepository.save(u);
    }

    // 이메일 인증 검사(중복검사)
    public boolean CheckUserEmail(String email) {


        return false;
    }

    // 이메일 인증 번호 검사(유효한 이메일인지 검사)

    // 닉네임 중복 검사
    public boolean CheckUserNickname(String nickname) {

        return false;
    }

    //비밀번호 정규 표현식 검사

}
