package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVolunteerReqDto {
    @Schema(description = "수정할 봉사 아이디", defaultValue = "1", requiredMode = RequiredMode.REQUIRED)
    private Long id;
    @Schema(description = "수정할 봉사 소제목", defaultValue = "봉사 소제목 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String subject;
    @Schema(description = "수정할 봉사 상세설명", defaultValue = "봉사 상세설명 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String description;
}
