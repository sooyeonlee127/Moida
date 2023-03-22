package com.ssafy.moida.api.request;

import com.ssafy.moida.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * [회원가입시 서버로 넘어오는 유저 정보 dto]
 * 이메일, 비밀번호, 전화번호, 닉네임, nft 주소, 지갑 주소, 역할
 */


@Getter
@Setter
public class UserJoinReqDto {

    private String email;
    private String password;
    private String phone;
    private String nickname;
    private String nftUrl;
    private String walletUrl;
    private Role role;

}
