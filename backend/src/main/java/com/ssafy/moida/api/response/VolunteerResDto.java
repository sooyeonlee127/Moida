package com.ssafy.moida.api.response;

import com.ssafy.moida.api.request.VolunteerReqDto;
import com.ssafy.moida.model.project.ProjectVolunteer;
import java.util.List;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerResDto extends VolunteerReqDto {
    private Long id;
    private List<DateInfoResDto> dates;

    public VolunteerResDto(ProjectVolunteer pv, List<DateInfoResDto> dates){
        super(pv);
        this.id = pv.getId();
        this.dates = dates;
    }
}
