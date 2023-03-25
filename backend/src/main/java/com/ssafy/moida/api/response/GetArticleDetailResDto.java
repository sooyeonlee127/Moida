package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * [세은] 사용자 인증게시판 상세 조회
 * 고유 아이디, 봉사 난이도, 소제목, 내용, 날짜, 카테고리, 사진
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetArticleDetailResDto {
    private Long id;
    private double difficultyLevel;
    private String subject;
    private  String description;
    private LocalDateTime regDate;
    private String category;
    private String url;
}
