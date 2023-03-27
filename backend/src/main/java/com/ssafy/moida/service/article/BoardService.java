package com.ssafy.moida.service.article;

import com.ssafy.moida.api.request.CreateBoardReqDto;
import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.repository.article.BoardRepository;
import com.ssafy.moida.service.project.ProjectService;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    private final ProjectService projectService;
    private final BoardRepository boardRepository;


    public BoardService(ProjectService projectService, BoardRepository boardRepository) {
        this.projectService = projectService;
        this.boardRepository = boardRepository;
    }

    /**
     * [세은] 데이터베이스에 공지사항 저장
     * @param createBoardReqDto
     * @param admin
     * @return
     */
    public Board save(CreateBoardReqDto createBoardReqDto, Users admin){
        Project project = projectService.findById(createBoardReqDto.getProjectId());
        Board board = Board.builder()
                .description(createBoardReqDto.getDescription())
                .subject(createBoardReqDto.getSubject())
                .project(project)
                .users(admin)
                .build();
        boardRepository.save(board);
        return board;
    }

    /**
     * [세은] 고유아이디로 존재 여부 확인
     * @param boardId
     * @return
     */
    public boolean existsById(Long boardId){
        return boardRepository.existsById(boardId);
    }
}
