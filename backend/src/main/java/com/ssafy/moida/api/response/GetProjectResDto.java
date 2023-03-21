package com.ssafy.moida.api.response;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.ProjectDto;
import java.util.List;
import lombok.Getter;

/**
 * [프로젝트 조회 Dto : 메인페이지에 필요한 데이터]
 * ProjectDto(프로젝트) : 프로젝트 아이디, 카테고리, 주제, 차수, 간단설명
 * DonationDto(기부) : 기부 일자(시작-종료), 모금액(현재, 목표), 설명
 * 사진
 */
@Getter
public class GetProjectResDto {
    private ProjectDto projectDto;
    private DonationDto donationDto;
    private List<String> pictures;

    public GetProjectResDto(ProjectDto projectDto, DonationDto donationDto, List<String> pictures) {
        this.projectDto = projectDto;
        this.donationDto = donationDto;
        this.pictures = pictures;
    }
}
