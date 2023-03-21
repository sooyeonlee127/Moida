package com.ssafy.moida.api.common;

import lombok.Getter;

/**
 * [봉사 정보를 담은 dto]
 * 난이도, 일자(시작-종료), 위치, 소제목, 설명 + 봉사 고유 아이디
 */
@Getter
public class VolunteerDto {
    private Long id;
    private double difficultyLevel;
    private String startDate;
    private String endDate;
    private String location;
    private String subject;
    private String description;

    public VolunteerDto(double difficultyLevel, String startDate, String endDate, String location, String subject, String description) {
        this.difficultyLevel = difficultyLevel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.subject = subject;
        this.description = description;
    }
}
