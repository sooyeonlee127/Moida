package com.ssafy.moida.model.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;

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

    @Column(length = 500, nullable = false)
    private String subject;

    @Column(length = 500)
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

    public void updateDifficulty(Double difficultyLevel){
        this.difficultyLevel = difficultyLevel;
    }
}
