package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 프로젝트 제목, 내용,
 * 기부 제목, 내용, 목표치는
 * 봉사 제목, 내용, 일별 수용 인원은 늘리기만 가능
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProjectReqDto {
    @Schema(description = "수정할 프로젝트 아이디", defaultValue = "1", requiredMode = RequiredMode.REQUIRED)
    private Long id;
    @Schema(description = "수정할 프로젝트 제목", defaultValue = "프로젝트 제목 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String subject;
    @Schema(description = "수정할 프로젝트 상세설명", defaultValue = "프로젝트 상세설명 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String description;
    private UpdateVolunteerReqDto updateVolunteerReqDto;
    private UpdateDonationReqDto updateDonationReqDto;
}
