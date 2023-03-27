package com.ssafy.moida.api.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [세은] 인증갤러리에서 공지사항 카테고리 누르면 나와야 하는 정보
 * 기수 리스트 : 기수, 고유 공지사항 아이디
 * 가장 최신의 공지 조회
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBoardListByCategoryResDto {
    private List<GetGenerationAndIdResDto> generationList;
    private GetBoardDetailResDto getBoardDetailResDto;
}
