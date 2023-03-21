package com.ssafy.moida.api.response;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.common.VolunteerDto;
import java.util.List;
import lombok.Getter;

/**
 * [프로젝트 상세 조회 dto: 상세 보기 페이지]
 * ProjectDto(프로젝트) : 프로젝트 아이디, 카테고리, 주제, 차수, 간단설명
 * DonationDto(기부) : 기부 일자(시작-종료), 모금액(현재, 목표), 설명
 * VolunteerDto(봉사) : 봉사 아이디, 봉사 일자(시작-종료), 설명
 * 사진
 */
@Getter
public class GetProjectDetailResDto{
    private ProjectDto projectDto;
    private DonationDto donationDto;
    private VolunteerDto volunteerDto;
    private List<String> pictures;

    public GetProjectDetailResDto(ProjectDto projectDto, DonationDto donationDto,
        VolunteerDto volunteerDto, List<String> pictures) {
        this.projectDto = projectDto;
        this.donationDto = donationDto;
        this.volunteerDto = volunteerDto;
        this.pictures = pictures;
    }
}
