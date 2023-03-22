package com.ssafy.moida.api.request.blockchain;

import lombok.Getter;

@Getter
public class SignupReqDto {
    private String email;
    private String password;
    private String nickname;
}
