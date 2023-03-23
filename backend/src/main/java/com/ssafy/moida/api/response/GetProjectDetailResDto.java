package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.ProjectReqDto;
import java.util.List;

import com.ssafy.moida.model.project.Project;
import lombok.*;

/**
 * [세은] 프로젝트 상세 조회 dto: 상세 보기 페이지
 * ProjectDto(프로젝트) : id, 카테고리, 주제, 차수, 간단설명
 * DonationDto(기부) : id, 기부 일자(시작-종료), 모금액(현재, 목표), 설명
 * VolunteerDto(봉사) : id, 난이도, 일자(시작-종료), 위치, 소제목, 설명
 * 사진
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetProjectDetailResDto{
    private Long id;
    private String thumbnail;
    private int generation;
    private ProjectReqDto projectReqDto;
    private DonationResDto donationResDto;
    private VolunteerResDto volunteerResDto;
    private List<String> pictures;

    public GetProjectDetailResDto(Project p, List<String> pics){
        this.id = p.getId();
        this.thumbnail = p.getThumbnail();
        this.generation = p.getGeneration();
        this.projectReqDto = new ProjectReqDto(p.getCategory(), p.getSubject(), p.getDescription());
        this.donationResDto = new DonationResDto(p.getProjectDonation());
        this.volunteerResDto = new VolunteerResDto(p.getProjectVolunteer());
        this.pictures = pics;
    }
}
