package com.ssafy.moida.api.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DateInfoResDto {
    @Schema(description = "봉사 일자 고유 아이디")
    private Long id;
    @Schema(description = "봉사 일자")
    private String date;
    @Schema(description = "하루 최대 수용 봉사자 수")
    private int maxCapacity;
    @Schema(description = "현재 신청한 봉사자 수")
    private int capacity;
}
