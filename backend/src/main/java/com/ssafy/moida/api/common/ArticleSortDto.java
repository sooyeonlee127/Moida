package com.ssafy.moida.api.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleSortDto {
    private int pageNumber;
    private int pageSize;
    private String category;
    private String sort;
}
