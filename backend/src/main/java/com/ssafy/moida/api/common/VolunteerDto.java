package com.ssafy.moida.api.common;

import com.ssafy.moida.model.ProjectVolunteer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * [봉사 정보를 담은 dto]
 * 난이도, 일자(시작-종료), 위치, 소제목, 설명 + 봉사 고유 아이디
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDto {
    private Long id;
    private double difficultyLevel;
    private String startDate;
    private String endDate;
    private String location;
    private String subject;
    private String description;

    public VolunteerDto(ProjectVolunteer pv){
        this.id = pv.getId();
        this.startDate = pv.getStartDate().toString();
        this.endDate = pv.getEndDate().toString();
        this.difficultyLevel = pv.getDifficultyLevel();
        this.location = pv.getLocation();
        this.subject = pv.getSubject();
        this.description = pv.getDescription();
    }
}
