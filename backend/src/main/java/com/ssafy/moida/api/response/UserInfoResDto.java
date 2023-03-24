package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 유저 개인정보 조회 Dto
 * 이메일, 닉네임, 티켓갯수, 포인트, ntfUrl, 봉사횟수, 총 사용 포인트
 */

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResDto {
    private String email;
    private String nickname;
    private int ticketCnt;
    private Long point;
    private String nftUrl;

    private long volunteerCnt;
    private Long totalPoint;



}
