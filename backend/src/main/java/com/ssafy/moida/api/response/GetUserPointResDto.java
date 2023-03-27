package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * [한선영] 포인트 사용 내역 dto
 * 포인트, 카테고리(기부, 충전), 일자, 프로젝트 차수, 프로젝트명, 티켓 개수 포함
 * */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class GetUserPointResDto {

    private Long points; // 기부내역,충전내역
    private String category; // 기부일땐 Minus, 충전일때 plus
    private LocalDateTime pointDate; // 기부내역,충전내역
    private String projectSubject; // 기부내역
    private int generation; // 기부내역
    private int ticketCnt; // 기부내역

    public GetUserPointResDto() {
    }

    // 포인트 충전
    public GetUserPointResDto(Long points, String category, LocalDateTime pointDate) {
        this.points = points;
        this.category = category;
        this.pointDate = pointDate;
    }

    public GetUserPointResDto(Long points, String category, LocalDateTime pointDate, String projectSubject, int generation, int ticketCnt) {
        this.points = points;
        this.category = category;
        this.pointDate = pointDate;
        this.projectSubject = projectSubject;
        this.generation = generation;
        this.ticketCnt = ticketCnt;
    }
}
