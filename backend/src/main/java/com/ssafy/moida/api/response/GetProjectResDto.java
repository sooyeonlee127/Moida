package com.ssafy.moida.api.response;

import com.ssafy.moida.api.common.DonationDto;
import java.util.List;
import lombok.Getter;

/**
 * [프로젝트 조회 Dto : 메인페이지에 필요한 데이터]
 * 프로젝트 고유 ID, 현재 모금액, DonationDto(봉사일자(시작-종료), 위치, 설명), 사진
 */
@Getter
public class GetProjectResDto {
    private Long projectId;
    private Long amount;
    private DonationDto donationDto;

    // 사진
    private List<String> pictures;

    public GetProjectResDto(long projectId, long amount, DonationDto donationDto, List<String> pictures) {
        this.projectId = projectId;
        this.amount = amount;
        this.donationDto = donationDto;
        this.pictures = pictures;
    }
}
