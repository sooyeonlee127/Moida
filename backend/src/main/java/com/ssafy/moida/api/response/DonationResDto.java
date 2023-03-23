package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.DonationReqDto;
import com.ssafy.moida.model.project.ProjectDonation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationResDto extends DonationReqDto {
    private Long id;
    private Long amount;

    public DonationResDto(ProjectDonation pd){
        super(pd);
        this.id = pd.getId();
        this.amount = pd.getAmount();
    }
}
