package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * [프로젝트 전체 정보 엔티티]
 * 프로젝트 아이디, 프로젝트명, 간단 설명, 차수, 카테고리
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    @Enumerated(EnumType.STRING)
    private Category category; //SQUIRREL, CRANE, WILD_ANIMAL
}
