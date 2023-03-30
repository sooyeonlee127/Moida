package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 봉사 일자 전체 조회 응답 데이터
 * 봉사 일자, 봉사 일자 고유 아이디,인증코드, 신청인원, 수용 가능 인원
 * 프로젝트 카테고리, 프로젝트 기수
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetVolunteerDateInfoResDto {
    private Long volunteerDateId;
    private LocalDate date;
    private String code;
    private int capacity;
    private int maxCapacity;
    private String projectCategory;
    private int projectGeneration;
}
