package com.ssafy.moida.api.common;

import lombok.Getter;

/**
 * [기부 정보를 담은 dto]
 * 기부 일자(시작-종료), 모금액(현재, 목표), 소제목, 설명 + 기부 아이디
 */
@Getter
public class DonationDto {
    private Long id;
    private String startDate;
    private String endDate;
    private Long targetAmount;
    private Long amount;
    private String subject;
    private String description;

    public DonationDto(String startDate, String endDate, Long targetAmount, Long amount,
        String subject,
        String description) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.targetAmount = targetAmount;
        this.amount = amount;
        this.subject = subject;
        this.description = description;
    }
}
