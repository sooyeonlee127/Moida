package com.ssafy.moida.model.project;

import jakarta.persistence.*;
import lombok.*;

/**
 * [프로젝트 전체 정보 엔티티]
 * PK : 프로젝트 아이디
 * FK : 프로젝트 기부, 프로젝트 봉사
 * 프로젝트명, 간단 설명, 차수, 카테고리, 메인 이미지
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String subject;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private int generation;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; //SQUIRREL, CRANE, WILD_ANIMAL

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_donation_id")
    private ProjectDonation projectDonation;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_volunteer_id")
    private ProjectVolunteer projectVolunteer;

    @Builder
    public Project(String subject, String description, int generation, String thumbnail, Category category,
        ProjectDonation projectDonation, ProjectVolunteer projectVolunteer) {
        this.subject = subject;
        this.description = description;
        this.generation = generation;
        this.thumbnail = thumbnail;
        this.category = category;
        this.projectDonation = projectDonation;
        this.projectVolunteer = projectVolunteer;
    }
}
