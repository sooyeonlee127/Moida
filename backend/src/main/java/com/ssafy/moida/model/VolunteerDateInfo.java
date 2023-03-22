package com.ssafy.moida.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

/**
 * [봉사 일자 엔티티]
 * PK : 봉사 일자 아이디
 * FK : 프로젝트
 * 봉사 일자, 신청인원(현재, 최대)
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="v_date_info")
public class VolunteerDateInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDate volunteerDate;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int maxCapacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public VolunteerDateInfo(LocalDate volunteerDate, int capacity, int maxCapacity,
        Project project) {
        this.volunteerDate = volunteerDate;
        this.capacity = capacity;
        this.maxCapacity = maxCapacity;
        this.project = project;
    }
}
