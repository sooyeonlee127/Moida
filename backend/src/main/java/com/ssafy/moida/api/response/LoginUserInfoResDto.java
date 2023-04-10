package com.ssafy.moida.api.response;

import com.ssafy.moida.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * [한선영] 로그인 후 네브바에 보여지는 User 정보
 * 티켓갯수, 포인트
 * */

@Getter
@AllArgsConstructor
public class LoginUserInfoResDto {
    private int ticketCnt;
    private Long point;
    private Role role;

}
