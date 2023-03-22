package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="v_date_info")
public class VolunteerDateInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime volunteerDate;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int maxCapacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public VolunteerDateInfo(LocalDateTime volunteerDate, int capacity, int maxCapacity,
        Project project) {
        this.volunteerDate = volunteerDate;
        this.capacity = capacity;
        this.maxCapacity = maxCapacity;
        this.project = project;
    }
}
