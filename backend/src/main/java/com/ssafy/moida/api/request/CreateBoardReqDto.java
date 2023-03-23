package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBoardReqDto {
    @Schema(description = "내용", defaultValue = "봉사 인증입니다.")
    private String description;
}
