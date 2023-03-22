package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.UserJoinReqDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="회원인증")
@RestController
@RequestMapping("/")
public class AuthController {

    // 회원가입
    @Operation(summary = "회원가입", description = "회원 가입을 합니다.")
    @PostMapping(consumes = {
            MediaType.APPLICATION_JSON_VALUE
    })
    public ResponseEntity<?> join(
            @RequestPart(value = "info", required = true) UserJoinReqDto userJoinReqDto) {

        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    // 로그인

    // 로그아웃

}
