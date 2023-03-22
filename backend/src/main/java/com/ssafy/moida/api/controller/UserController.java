package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "닉네임 중복 검사", description = "회원 닉네임 중복 검사를 합니다.")
    @PostMapping(
            path = "/exists/nickname",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> checkUserNickname(
            @PathVariable String nickname
    ) {
        userService.DuplicatedUserByNickname(nickname);                 // 닉네임 중복 검사
        return new ResponseEntity<>("닉네임 중복 없음", HttpStatus.OK);
    }

}
