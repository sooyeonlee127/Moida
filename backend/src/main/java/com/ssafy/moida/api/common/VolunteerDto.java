package com.ssafy.moida.api.common;

import lombok.Getter;

/**
 * [봉사 정보를 담은 dto]
 * 봉사일자(시작-종료), 위치, 설명 + 봉사 고유 아이디
 */
@Getter
public class VolunteerDto {
    private Long id;
    private String startDate;
    private String endDate;
    private String location;
    private String description;

    public VolunteerDto(String startDate, String endDate, String location, String description) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.description = description;
    }
}
