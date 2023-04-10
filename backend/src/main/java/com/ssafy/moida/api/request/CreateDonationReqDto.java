package com.ssafy.moida.api.request;

import com.ssafy.moida.api.common.TransactionDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateDonationReqDto {
    @Schema(description = "프로젝트 아이디", defaultValue = "1")
    private Long projectId;
    @Schema(description = "기부한 모이 수", defaultValue = "5")
    private int moi;
    @Schema(description = "transaction 객체")
    private TransactionDto transactionDto;
}
