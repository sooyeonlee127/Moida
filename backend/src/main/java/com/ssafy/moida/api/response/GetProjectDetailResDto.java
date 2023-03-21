package com.ssafy.moida.api.response;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.VolunteerDto;
import java.util.List;
import lombok.Getter;

/**
 * [프로젝트 상세 조회 dto(프로젝트 조회 상속): 상세 보기 페이지]
 * GetProjectResDto : 프로젝트 고유 ID, 현재 모금액, DonationDto(봉사일자(시작-종료), 위치, 설명), 사진
 * volunteerDto(봉사) : 봉사 일자(시작-종료), 목표 모금액, 설명
 * 봉사 아이디
 */
@Getter
public class GetProjectDetailResDto extends GetProjectResDto{
    private VolunteerDto volunteerDto;
    private Long volunteerId;
    private int generation;

    public GetProjectDetailResDto(long projectId, long amount, DonationDto donationDto, List<String> pictures,int generation, VolunteerDto volunteerDto) {
        super(projectId, amount, donationDto, pictures);
        this.generation = generation;
        this.volunteerDto = volunteerDto;
    }
}
