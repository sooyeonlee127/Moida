package com.ssafy.moida.api.request;

import com.ssafy.moida.model.project.ProjectDonation;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * [세은] 기부 정보를 담은 dto
 * 기부 일자(시작-종료), 모금액(현재, 목표), 소제목, 설명 + 기부 아이디
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DonationReqDto {
    @Schema(description = "시작 날짜", defaultValue = "2023-03-24")
    private String startDate;
    @Schema(description = "종료 날짜", defaultValue = "2023-03-27")
    private String endDate;
    @Schema(description = "목표 곡물 갯수", defaultValue = "2500")
    private Long targetAmount;
    @Schema(description = "소제목", defaultValue = "다람쥐에게 도토리를 주세요")
    private String subject;
    @Schema(description = "상세 설명", defaultValue = "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다")
    private String description;

    public DonationReqDto(ProjectDonation pd){
        this.startDate = String.valueOf(pd.getStartDate());
        this.endDate = String.valueOf(pd.getEndDate());
        this.targetAmount = pd.getTargetAmount();
        this.subject = pd.getSubject();
        this.description = pd.getDescription();
    }
}
