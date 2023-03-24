package com.ssafy.moida.api.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class LoginDto {
    @Schema(description = "사용자 이메일", defaultValue = "babo@moida.com")
    private String email;
    @Schema(description = "비밀번호", defaultValue = "ssafy123!")
    private String password;
}
