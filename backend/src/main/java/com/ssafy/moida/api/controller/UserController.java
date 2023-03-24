package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

/**
 * 회원관리 관련 컨트롤러
 */
@Tag(name="회원관리")
@RestController
@RequestMapping("/users")
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
        userService.vaildUserByPassword(userJoinReqDto.getPassword());  // 비밀번호 정규식 검사
        userService.joinUser(userJoinReqDto);                           // 회원 가입
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @Operation(summary = "닉네임 중복 검사", description = "회원 닉네임 중복 검사를 합니다.")
    @PostMapping(
            path = "/exists/nickname/{nickname}"
    )
    public ResponseEntity<?> checkUserNickname(
            @PathVariable(value = "nickname") String nickname
    ) {
        userService.duplicatedUserByNickname(nickname); // 닉네임 중복 검사
        return new ResponseEntity<>("닉네임 중복 없음", HttpStatus.OK);
    }

    @Operation(summary = "이메일 중복 검사 및 인증", description = "회원이 입력한 이메일의 중복 검사를 합니다. 중복이 아니라면 이메일로 인증 코드를 발송합니다.")
    @PostMapping(
            path = "/exists/email/{email}"
    )
    public ResponseEntity<?> checkUserEmail(
            @PathVariable(value = "email") String email
    ) throws MessagingException, UnsupportedEncodingException {
        String code = userService.duplicatedUserByEmail(email); // 이메일 중복 검사 및 인증

        return new ResponseEntity<>(code, HttpStatus.OK);
    }

    @GetMapping(
            path = "/me"
    )
    public ResponseEntity<?> getUserDetail (
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        // 로그인 된 유저 정보 가져오기
        Users user = userService.findByEmail(principal.getUsername());



        return new ResponseEntity<>("my", HttpStatus.OK);
    }

}
