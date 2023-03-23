package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.DonationReqDto;
import com.ssafy.moida.api.common.ProjectDto;

import com.ssafy.moida.model.project.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * [세은] 프로젝트 조회 Dto : 메인페이지에 필요한 데이터
 * ProjectDto(프로젝트) : 프로젝트 아이디, 카테고리, 주제, 차수, 간단설명
 * DonationDto(기부) : 기부 일자(시작-종료), 모금액(현재, 목표), 설명
 * 사진
 */
@Getter
@AllArgsConstructor
public class GetProjectResDto {
    private Long id;
    private ProjectDto projectDto;
    private DonationResDto donationResDto;

    public GetProjectResDto(ProjectDto projectDto, DonationResDto donationResDto) {
        this.projectDto = projectDto;
        this.donationResDto = donationResDto;
    }

    public GetProjectResDto(Project p){
        this.id = p.getId();
        this.projectDto = new ProjectDto(p.getCategory(), p.getSubject(), p.getDescription());
        this.donationResDto = new DonationResDto(p.getProjectDonation());
    }
}
