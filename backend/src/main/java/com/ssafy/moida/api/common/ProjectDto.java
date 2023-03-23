package com.ssafy.moida.api.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * [세은] 프로젝트 자체 dto
 * 카테고리, 주제, 차수, 간단설명 + 프로젝트 아이디
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long id;
    private String category;
    private String subject;
    private String description;
    private int generation;

    public ProjectDto(String category, String subject, String description, int generation) {
        this.category = category;
        this.subject = subject;
        this.description = description;
        this.generation = generation;
    }
}
