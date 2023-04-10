package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDonationReqDto {
    @Schema(description = "수정할 기부 아이디", defaultValue = "1", requiredMode = RequiredMode.REQUIRED)
    private Long id;
    @Schema(description = "수정할 기부 소제목", defaultValue = "기부 소제목 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String subject;
    @Schema(description = "수정할 기부 상세설명", defaultValue = "기부 상세설명 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String description;
    @Schema(description = "수정할 기부액", defaultValue = "3000", requiredMode = RequiredMode.NOT_REQUIRED)
    private Long targetAmount;
}
