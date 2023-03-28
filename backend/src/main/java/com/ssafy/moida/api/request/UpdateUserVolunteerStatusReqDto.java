package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserVolunteerStatusReqDto {
    @Schema(description = "변경하고자 하는 사용자 봉사 고유 아이디", defaultValue = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long volunteerId;
    @Schema(description = "변경하고자 상태", defaultValue = "DONE", requiredMode = Schema.RequiredMode.REQUIRED, allowableValues = {"DONE", "CANCEL"})
    private String status;
    @Schema(description = "DONE으로 변경할 시 인증 코드", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String code;
}
