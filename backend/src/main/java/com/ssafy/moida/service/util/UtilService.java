package com.ssafy.moida.service.util;

import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class UtilService {

    private final UserRepository userRepository;

    public UtilService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 이메일 인증 검사(중복검사)
    public void DuplicatedUserByEmail(String email) {
        // 이메일 중복이면 false
        // 이메일 중복이 아니면 인증 번호 생성해서 해당 이메일로 전송하고 true

        // 이메일이 존재하면 true, 아니라면 false
        boolean userEmail = userRepository.existsByEmail(email);

        // 이메일이 존재한다면 중복이므로 에러 던지기
        if(userEmail) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        // 중복이 아니라면 인증 번호 생성해서 이메일로 전송하기


    }

    // 이메일 인증 번호 검사(유효한 이메일인지 검사)
    public boolean VaildUserByEmail(String number) {
        // 보낸 인증 번호와 입력한 인증 번호가 같다면 true
        // 다르다면 false

        return false;
    }

}
