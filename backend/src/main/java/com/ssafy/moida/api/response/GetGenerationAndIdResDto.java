package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [세은] 기수, 고유 공지사항 아이디
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetGenerationAndIdResDto {
    private Long id;
    private int generation;
}
