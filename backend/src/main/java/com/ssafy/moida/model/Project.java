package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private Long target_amount;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime start_date;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime end_date;

    @Column(nullable = false, length = 5000)
    private String subject;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private int generation;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category; //SQUIRREL, CRANE, WILD_ANIMAL

}
