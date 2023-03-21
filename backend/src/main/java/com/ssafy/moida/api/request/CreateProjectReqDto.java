package com.ssafy.moida.api.request;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.VolunteerDto;
import lombok.Getter;

/**
 * [프로젝트 생성(관리자) dto]
 * donationDto(기부) : 봉사일자(시작-종료), 위치, 설명
 * volunteerDto(봉사) : 봉사 일자(시작-종료), 목표 모금액, 설명
 * 프로젝트 자체 : 카테고리, 주제, 차수
 */
@Getter
public class CreateProjectReqDto {
    private DonationDto donationDto;
    private VolunteerDto volunteerDto;
    private String category;
    private String subject;
    private int generation;
    public CreateProjectReqDto(DonationDto donationDto, VolunteerDto volunteerDto, String category,
        String subject, int generation) {
        this.donationDto = donationDto;
        this.volunteerDto = volunteerDto;
        this.category = category;
        this.subject = subject;
        this.generation = generation;
    }
}
