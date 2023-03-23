package com.ssafy.moida.api.common;

import com.ssafy.moida.model.project.ProjectDonation;
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
public class DonationDto {
    private Long id;
    private String startDate;
    private String endDate;
    private Long targetAmount;
    private Long amount;
    private String subject;
    private String description;

    public DonationDto(ProjectDonation pd){
        this.id = pd.getId();
        this.startDate = String.valueOf(pd.getStartDate());
        this.endDate = String.valueOf(pd.getEndDate());
        this.targetAmount = pd.getTargetAmount();
        this.amount = pd.getAmount();
        this.subject = pd.getSubject();
        this.description = pd.getDescription();
    }
}
