package com.ssafy.moida.api.controller;

/*
 * [희주] 블록체인 테스트 전용 컨트롤러
 */

import com.ssafy.moida.api.request.blockchain.SignupReqDto;
import com.ssafy.moida.model.Users;
//import com.ssafy.moida.service.blockchain.TestService;
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
//    private final TestService testService;
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody SignupReqDto dto) throws ChangeSetPersister.NotFoundException {
        Users user= Users.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .nickname(dto.getNickname())
                .build();

//        testService.saveOrUpdateUser(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);

    }
}
