package com.ssafy.moida.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [한선영] 변경된 비밀번호를 받는 Dto
 * 현재 비밀번호, 새로운 비밀번호
 * */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePwdReqDto {

    private String currentPassword;
    private String newPassword;

}
