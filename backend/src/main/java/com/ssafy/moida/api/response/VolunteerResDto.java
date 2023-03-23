package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.VolunteerReqDto;
import com.ssafy.moida.model.project.ProjectVolunteer;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerResDto extends VolunteerReqDto {
    private Long id;

    public VolunteerResDto(ProjectVolunteer pv){
        super(pv);
        this.id = pv.getId();
    }
}
