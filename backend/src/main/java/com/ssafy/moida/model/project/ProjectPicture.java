package com.ssafy.moida.model.project;

import jakarta.persistence.*;
import lombok.*;

/**
 * [프로젝트 사진 엔티티]
 * PK : 사진 아이디
 * FK : 프로젝트 아이디
 * 사진 url
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="p_picture")
public class ProjectPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Builder
    public ProjectPicture(String url, Project project) {
        this.url = url;
        this.project = project;
    }
}
