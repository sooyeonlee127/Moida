package com.ssafy.moida.api.common;

import com.ssafy.moida.model.ProjectVolunteer;
import java.time.LocalDate;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * [봉사 정보를 담은 dto]
 * 난이도, 일자(시작-종료), 위치, 매일 가능한 봉사인원, 소제목, 설명 + 봉사 고유 아이디
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDto {
    private Long id;
    private String startDate;
    private String endDate;
    private double difficultyLevel;
    private String location;
    private int capacityPerDate;
    private String subject;
    private String description;

    public VolunteerDto(ProjectVolunteer pv){
        this.id = pv.getId();
        this.startDate = String.valueOf(pv.getStartDate());
        this.endDate = String.valueOf(pv.getEndDate());
        this.difficultyLevel = pv.getDifficultyLevel();
        this.location = pv.getLocation();
        this.capacityPerDate = pv.getCapacityPerDate();
        this.subject = pv.getSubject();
        this.description = pv.getDescription();
    }
}
