package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * [프로젝트 사진 엔티티]
 * PK : 사진 아이디
 * FK : 프로젝트 아이디
 * 사진 url
 */
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="p_picture")
public class ProjectPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String pictureUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public ProjectPicture(String pictureUrl, Project project) {
        this.pictureUrl = pictureUrl;
        this.project = project;
    }
}
