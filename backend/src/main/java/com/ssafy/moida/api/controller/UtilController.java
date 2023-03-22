package com.ssafy.moida.api.controller;

import com.ssafy.moida.service.util.UtilService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jdk.jshell.execution.Util;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@Tag(name="회원관리")
@RestController
@RequestMapping("/user/")
public class UtilController {

    private final UtilService utilService;

    public UtilController(UtilService utilService) {
        this.utilService = utilService;
    }

    // 이메일 인증 검사(중복검사) -> 중복이면 409 에러, 아니면 이메일 보내고 200
    @Operation(summary = "이메일 중복 검사 및 인증", description = "회원이 입력한 이메일의 중복 검사를 합니다. 중복이 아니라면 이메일로 인증 코드를 발송합니다.")
    @PostMapping(
            path = "/exists/email/{email}"
            //consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> checkUserEmail(
            @PathVariable("email") String email
    ) throws MessagingException, UnsupportedEncodingException {
        utilService.DuplicatedUserByEmail(email); // 이메일 중복 검사

        // 중복이 아니라면 인증 번호 생성해서 이메일로 전송하기
        MimeMessage message = utilService.createMessage(email);
        String code = utilService.sendMessage(message);
        return new ResponseEntity<>(code, HttpStatus.OK);
    }

}
