package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.service.UserService;
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

    // 회원가입
    @Operation(summary = "회원가입", description = "회원 가입을 합니다.")
    @PostMapping(
            path = "/join",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> join(
            @RequestBody UserJoinReqDto userJoinReqDto
    ) {
        // 이메일 중복 검사
        // 닉네임 중복 검사
        userService.JoinUser(userJoinReqDto); // 회원 가입

        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

}
