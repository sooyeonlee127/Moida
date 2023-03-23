package com.ssafy.moida.api.response;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.common.VolunteerDto;
import java.util.List;

import com.ssafy.moida.model.project.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * [세은] 프로젝트 상세 조회 dto: 상세 보기 페이지
 * ProjectDto(프로젝트) : id, 카테고리, 주제, 차수, 간단설명
 * DonationDto(기부) : id, 기부 일자(시작-종료), 모금액(현재, 목표), 설명
 * VolunteerDto(봉사) : id, 난이도, 일자(시작-종료), 위치, 소제목, 설명
 * 사진
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProjectDetailResDto{
    private Long id;
    private ProjectDto projectDto;
    private DonationDto donationDto;
    private VolunteerDto volunteerDto;
    private List<String> pictures;

    public GetProjectDetailResDto(Project p, List<String> pics){
        this.id = p.getId();
        this.projectDto = new ProjectDto(p.getCategory().toString(), p.getSubject(), p.getDescription(), p.getGeneration());
        this.donationDto = new DonationDto(p.getProjectDonation());
        this.volunteerDto = new VolunteerDto(p.getProjectVolunteer());
        this.pictures = pics;
    }
}
