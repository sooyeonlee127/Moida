package com.ssafy.moida.api.request;

import com.ssafy.moida.model.user.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * [한선영] 회원가입시 서버로 넘어오는 유저 정보 dto
 * 이메일, 비밀번호, 전화번호, 닉네임, nft 주소, 지갑 주소, 역할
 */


@Data
public class UserJoinReqDto {
    @Schema(description = "이메일", defaultValue = "babo@moida.com")
    private String email;
    @Schema(description = "비밀번호", defaultValue = "ssafy123!")
    private String password;
    @Schema(description = "전화 번호", defaultValue = "010-1234-3829")
    private String phone;
    @Schema(description = "닉네임", defaultValue = "babo")
    private String nickname;
    @Schema(description = "기본 NFT", defaultValue = "")
    private String nftUrl;
    @Schema(description = "지갑 주소", defaultValue = "")
    private String walletUrl;
    @Schema(description = "역할", defaultValue = "ROLE_USER")
    private Role role;
}
