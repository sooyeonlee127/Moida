package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBoardReqDto {
    @Schema(description = "제목", defaultValue = "다람쥐 1기 프로젝트")
    private String subject;
    @Schema(description = "내용", defaultValue = "봉사 인증입니다.")
    private String description;
    @Schema(description = "프로젝트 아이디", defaultValue = "1")
    private Long projectId;
}
