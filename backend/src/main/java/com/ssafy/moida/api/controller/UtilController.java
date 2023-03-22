package com.ssafy.moida.api.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="회원관리")
@RestController
@RequestMapping("/user/")
public class UtilController {

    //Util Controller에서 진행하기로~
    // 이메일 인증 검사(중복검사) -> 중복이면 409 에러, 아니면 이메일 보내고 200
    // 이메일 인증 번호 검사(유효한 이메일인지 검사) -> 인증 번호가 틀리면 409 에러? false?, 맞으면 200

}
