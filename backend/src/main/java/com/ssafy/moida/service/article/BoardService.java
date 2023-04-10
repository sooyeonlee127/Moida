package com.ssafy.moida.service.article;

import com.ssafy.moida.api.request.CreateBoardReqDto;
import com.ssafy.moida.api.request.UpdateBoardReqDto;
import com.ssafy.moida.api.response.GetBoardDetailResDto;
import com.ssafy.moida.api.response.GetGenerationAndIdResDto;
import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.repository.article.BoardRepository;
import com.ssafy.moida.service.project.ProjectService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {
    private final ProjectService projectService;
    private final BoardRepository boardRepository;
    private final BoardDocumentService boardDocumentService;
    public BoardService(ProjectService projectService, BoardRepository boardRepository,
        BoardDocumentService boardDocumentService) {
        this.projectService = projectService;
        this.boardRepository = boardRepository;
        this.boardDocumentService = boardDocumentService;
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
     * [세은] 고유 아이디로 존재 여부 확인
     * @param boardId
     * @return
     */
    public boolean existsById(Long boardId){
        return boardRepository.existsById(boardId);
    }

    /**
     * [세은] 프로젝트 아이디에 이미 작성된 공지사항이 있는지 여부 확인
     * @param projectId
     * @return
     */
    public boolean existsByProjectId(Long projectId){
        return boardRepository.countBoardByProject(projectId) > 0 ? true : false;
    }

    /**
     * [세은] 고유 아이디로 객체 조회
     * @param boardId
     * @return
     */
    public Board findById(Long boardId){
        return boardRepository.findById(boardId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }

    /**
     * [세은] 해당 프로젝트 아이디로 세부 공지사항 가져오기
     * @param projectId
     * @return
     */
    public GetBoardDetailResDto getBoardDetailByProject(Long projectId){
        projectService.existsProjectById(projectId);

        Board board = boardRepository.getBoardByProject(projectId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        return new GetBoardDetailResDto(board, boardDocumentService.getFileList(board));
    }

    /**
     * [세은] 카테고리에 따른 기수 리스트 반환
     * @param category
     * @return
     */
    public List<GetGenerationAndIdResDto> getGenerationList(String category){
        List<Project> projectList = projectService.getGenerationListByCategory(category);
        return projectList.stream()
            .map(project -> new GetGenerationAndIdResDto(project.getId(), project.getGeneration()))
            .collect(Collectors.toList());
    }

    /**
     * [세은] 공지사항 수정
     * @param updateBoardReqDto
     */
    @Transactional
    public void updateBoard(UpdateBoardReqDto updateBoardReqDto){
        Board board = findById(updateBoardReqDto.getId());
        board.updateBoard(updateBoardReqDto.getSubject(), updateBoardReqDto.getDescription());
    }
}
