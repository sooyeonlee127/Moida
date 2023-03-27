package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * [세은] 사용자 인증게시판 리스트 조회
 * 고유 아이디, 봉사 난이도, 날짜, 카테고리, 사진
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetArticleResDto {
    private Long id;
    private String subject;
    private String url;
    private double difficultyLevel;
}
