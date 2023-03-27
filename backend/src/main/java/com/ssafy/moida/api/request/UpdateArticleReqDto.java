package com.ssafy.moida.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateArticleReqDto {
    @Schema(description = "수정할 게시글 아이디", defaultValue = "1", requiredMode = RequiredMode.REQUIRED)
    private Long id;
    @Nullable
    @Schema(description = "수정할 제목", defaultValue = "제목 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String subject;
    @Nullable
    @Schema(description = "수정할 상세정보", defaultValue = "상세정보 수정~.~", requiredMode = RequiredMode.NOT_REQUIRED)
    private String description;
}
