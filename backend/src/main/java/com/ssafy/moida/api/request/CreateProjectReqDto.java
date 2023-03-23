package com.ssafy.moida.api.request;

import lombok.Getter;

/**
 * [프로젝트 생성(관리자) dto]
 * volunteerDto(봉사) : id, 난이도, 일자(시작-종료), 위치, 소제목, 설명
 * donationDto(기부) : id, 기부 일자(시작-종료), 모금액(목표, 현재), 소제목, 설명
 * 프로젝트 자체 : 카테고리, 주제, 차수, 간단설명
 */
@Getter
public class CreateProjectReqDto {
    private ProjectReqDto projectReqDto;
    private DonationReqDto donationReqDto;
    private VolunteerReqDto volunteerReqDto;
}
