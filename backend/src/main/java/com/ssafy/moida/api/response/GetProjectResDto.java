package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.ProjectReqDto;

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
    private ProjectReqDto projectReqDto;
    private DonationResDto donationResDto;

    public GetProjectResDto(ProjectReqDto projectReqDto, DonationResDto donationResDto) {
        this.projectReqDto = projectReqDto;
        this.donationResDto = donationResDto;
    }

    public GetProjectResDto(Project p){
        this.id = p.getId();
        this.projectReqDto = new ProjectReqDto(p.getCategory(), p.getSubject(), p.getDescription());
        this.donationResDto = new DonationResDto(p.getProjectDonation());
    }
}
