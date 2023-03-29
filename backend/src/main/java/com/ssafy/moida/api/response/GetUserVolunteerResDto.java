package com.ssafy.moida.api.response;

import com.ssafy.moida.model.project.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * [한선영] 봉사 내역 dto
 * 봉사Id, 프로젝트Id, 프로젝트명, 기수, 봉사일시, 상태
 * */

@Getter
@Setter
@Builder
@AllArgsConstructor
public class GetUserVolunteerResDto {
    private Long volunteerId;
    private Long projectId;
    private Long articleId;
    private String projectSubject;
    private int generation;
    private LocalDateTime regDate;
    private Status status;
}
