package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * User에 관련된 각종 함수를 처리하는 서비스
 */

@Slf4j
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
    public boolean DuplicatedUserByEmail(String email) {
        // 이메일 중복이면 false
        // 이메일 중복이 아니면 인증 번호 생성해서 해당 이메일로 전송하고 true

        return false;
    }

    // 이메일 인증 번호 검사(유효한 이메일인지 검사)
    public boolean VaildUserByEmail(String number) {
        // 보낸 인증 번호와 입력한 인증 번호가 같다면 true
        // 다르다면 false

        return false;
    }

    // 닉네임 중복 검사
    public boolean DuplicatedUserByNickname(String nickname) {
        // 닉네임이 중복이면 false
        // 닉네님이 중복이 아니라면 true

        return false;
    }

    //비밀번호 정규 표현식 검사
    public void VaildUserByPassword(String password) {
        // 영문대소문자, 숫자, 특수문자 조합 8자이상 16자 이내
        Pattern pwdPattern = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,16}$");
        Matcher pwdMatcher = pwdPattern.matcher(password);

        // 비밀번호 정규 표현식을 검사 했을 때 조건에 맞다면 그냥 두기
        // 조건에 맞지 않다면 에러 던지기
        if(!pwdMatcher.find()) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }


    }

}
