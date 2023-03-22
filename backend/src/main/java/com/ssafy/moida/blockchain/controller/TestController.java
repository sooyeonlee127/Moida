package com.ssafy.moida.blockchain.controller;

/*
 * [희주] 블록체인 테스트 전용 컨트롤러
 */

import com.ssafy.moida.blockchain.dto.SignupReqDto;
import com.ssafy.moida.blockchain.service.TestService;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TestService testService;
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody SignupReqDto dto) throws ChangeSetPersister.NotFoundException {
        Users user= Users.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .build();

        testService.saveOrUpdateUser(user, Role.ROLE_USER);
        return new ResponseEntity<>(user, HttpStatus.CREATED);

    }
}
