package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.common.LoginDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="회원인증")
@RestController
@RequestMapping("/")
public class AuthController {

    @Operation(summary = "로그인", description = "로그인을 합니다.")
    @PostMapping(
            path = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> login(
            @RequestBody LoginDto loginDto
    ) {
        //로그인

        return new ResponseEntity<>("로그인", HttpStatus.OK);
    }

    // 로그아웃


}
