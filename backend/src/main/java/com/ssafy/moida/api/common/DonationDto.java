package com.ssafy.moida.api.common;

import lombok.Getter;

/**
 * [기부 정보를 담은 dto]
 * 봉사 일자(시작-종료), 목표 모금액, 설명
 */
@Getter
public class DonationDto {
    private String startDate;
    private String endDate;
    private Long targetAmount;
    private String description;

    public DonationDto(String startDate, String endDate, long targetAmount, String description) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.targetAmount = targetAmount;
        this.description = description;
    }
}
