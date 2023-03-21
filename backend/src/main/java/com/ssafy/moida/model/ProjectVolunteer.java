package com.ssafy.moida.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name="p_volunteer")
public class ProjectVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double difficultyLevel;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private LocalDateTime endDate;

    @Column(length = 500, nullable = false)
    private String location;

    @Column(length = 500)
    private String description;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
