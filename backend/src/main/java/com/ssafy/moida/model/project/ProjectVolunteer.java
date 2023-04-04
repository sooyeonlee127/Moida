package com.ssafy.moida.model.project;

import com.ssafy.moida.api.request.UpdateVolunteerReqDto;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;

/**
 * [프로젝트 봉사 섹션에 해당하는 엔티티]
 * PK : 프로젝트 봉사 아이디
 * 난이도, 일자(시작-종료), 위치, 소제목, 설명
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProjectVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double difficultyLevel;

    @Column(updatable = false)
    private LocalDateTime startDate;

    @Column(updatable = false)
    private LocalDateTime endDate;

    @Column(length = 500, nullable = false)
    private String location;

    @Column(nullable = false)
    private int capacityPerDate;

    @Column(length = 1000, nullable = false)
    private String subject;

    @Column(length = 2000)
    private String description;

    @Builder
    public ProjectVolunteer(Double difficultyLevel, LocalDateTime startDate, LocalDateTime endDate,
        String location, int capacityPerDate, String subject, String description) {
        this.difficultyLevel = difficultyLevel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.capacityPerDate = capacityPerDate;
        this.subject = subject;
        this.description = description;
    }

    /**
     * [세은] 프로젝트별 봉사 난이도 수정
     * @param difficultyLevel
     */
    public void updateDifficulty(Double difficultyLevel){
        this.difficultyLevel = difficultyLevel;
    }

    /**
     * [세은] 기부 엔티티 데이터 수정
     * @param updateVolunteerReqDto
     */
    public void updateProjectVolunteerDetails(UpdateVolunteerReqDto updateVolunteerReqDto){
        if(!StringUtils.isBlank(updateVolunteerReqDto.getSubject())) this.subject = updateVolunteerReqDto.getSubject();
        if(!StringUtils.isBlank(updateVolunteerReqDto.getDescription())) this.description = updateVolunteerReqDto.getDescription();
    }
}
