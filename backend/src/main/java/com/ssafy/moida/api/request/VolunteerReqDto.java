package com.ssafy.moida.api.request;

import com.ssafy.moida.model.project.ProjectVolunteer;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [세은] 봉사 정보를 담은 dto
 * 난이도, 일자(시작-종료), 위치, 매일 가능한 봉사인원, 소제목, 설명 + 봉사 고유 아이디
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerReqDto {
    @Schema(description = "시작 날짜", defaultValue = "2023-03-28")
    private String startDate;
    @Schema(description = "종료 날짜", defaultValue = "2023-04-10")
    private String endDate;
    @Schema(description = "봉사 난이도", defaultValue = "5.0")
    private double difficultyLevel;
    @Schema(description = "봉사 위치", defaultValue = "제주특별자치도 제주시 첨단로 242")
    private String location;
    @Schema(description = "일별 수용 인원", defaultValue = "15")
    private int capacityPerDate;
    @Schema(description = "소제목", defaultValue = "다람쥐에게 도토리를 전달해요")
    private String subject;
    @Schema(description = "상세 설명", defaultValue = "먹이가 필요한 다람쥐에게 도토리를 전달하는 봉사입니다")
    private String description;

    public VolunteerReqDto(ProjectVolunteer pv){
        this.startDate = String.valueOf(pv.getStartDate());
        this.endDate = String.valueOf(pv.getEndDate());
        this.difficultyLevel = pv.getDifficultyLevel();
        this.location = pv.getLocation();
        this.capacityPerDate = pv.getCapacityPerDate();
        this.subject = pv.getSubject();
        this.description = pv.getDescription();
    }
}
