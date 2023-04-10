package com.ssafy.moida.api.response;

import com.ssafy.moida.model.article.Board;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetBoardDetailResDto {
    private Long id;
    private String subject;
    private String description;
    private String adminNickname;
    private LocalDateTime regDate;
    private List<String> fileList;
    private Long projectId;

    public GetBoardDetailResDto(Board board, List<String> fileList){
        this.id = board.getId();
        this.subject = board.getSubject();
        this.adminNickname = board.getUsers().getNickname();
        this.regDate = board.getRegDate();
        this.description = board.getDescription();
        this.projectId = board.getProject().getId();
        this.fileList = fileList;
    }
}
