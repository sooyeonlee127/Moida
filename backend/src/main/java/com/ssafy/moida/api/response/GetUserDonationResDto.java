package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * [한선영] 기부 내역 dto
 * 프로젝트id, 프로젝트명, 프로젝트 차수, 기부날짜, 기부포인트, 받은 티켓 개수
 */

@Getter
@Builder
@AllArgsConstructor
public class GetUserDonationResDto {

    private Long projectId;
    private String projectSubject;
    private int generation;
    private LocalDateTime regDate;
    private Long FeedPerPoint;
    private int ticketCnt;

}
