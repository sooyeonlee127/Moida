package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 회원관리 관련 컨트롤러
 */
@Tag(name="회원관리")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "회원가입", description = "회원 가입을 합니다.")
    @PostMapping(
            path = "/join",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> join(
            @RequestBody UserJoinReqDto userJoinReqDto
    ) {
        userService.VaildUserByPassword(userJoinReqDto.getPassword());  // 비밀번호 정규식 검사
        userService.JoinUser(userJoinReqDto);                           // 회원 가입
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    // 이메일 인증 검사(중복검사) -> 중복이면 409 에러, 아니면 이메일 보내고 200
    // 이메일 인증 번호 검사(유효한 이메일인지 검사) -> 인증 번호가 틀리면 409 에러? false?, 맞으면 200
    // 닉네임 중복 검사 -> 중복이면 409? false?, 아니면 200

}
