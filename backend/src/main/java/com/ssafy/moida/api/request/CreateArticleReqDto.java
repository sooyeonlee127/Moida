package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateArticleReqDto {
    @Schema(description = "제목", defaultValue = "다람쥐 봉사 후기")
    private String subject;
    @Schema(description = "내용", defaultValue = "너무나 즐거웠어요~해피해피")
    private String description;
    @Schema(description = "난이도", defaultValue = "4.0")
    private Double difficultyLevel;
    @Schema(description = "카테고리", defaultValue = "CRANE")
    private String category;
    @Schema(description = "봉사 프로젝트 아이디", defaultValue = "1")
    private Long usersVolunteerProjectId;
}
