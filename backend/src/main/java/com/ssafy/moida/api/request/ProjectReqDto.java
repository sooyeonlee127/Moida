package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [세은] 프로젝트 자체 dto
 * 카테고리, 주제, 차수, 간단설명 + 프로젝트 아이디
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectReqDto {
    @Schema(description = "카테고리", defaultValue = "CRANE", allowableValues = {"SQUIRREL", "CRANE", "WILD_ANIMAL"})
    private String category;
    @Schema(description = "프로젝트명", defaultValue = "다람쥐와 도토리")
    private String subject;
    @Schema(description = "프로젝트 대략의 설명", defaultValue = "다람쥐는 오늘도 도토리를 찾아 헤맵니다...")
    private String description;
    @Schema(description = "곡물 당 포인트 가치", defaultValue = "1400")
    private Long pointPerMoi;
}
