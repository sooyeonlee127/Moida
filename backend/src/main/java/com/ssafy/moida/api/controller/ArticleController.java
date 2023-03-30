package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.common.ArticleSortDto;
import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.api.request.CreateBoardReqDto;
import com.ssafy.moida.api.request.UpdateArticleReqDto;
import com.ssafy.moida.api.request.UpdateBoardReqDto;
import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.api.response.GetArticleResDto;
import com.ssafy.moida.api.response.GetBoardDetailResDto;
import com.ssafy.moida.api.response.GetBoardListByCategoryResDto;
import com.ssafy.moida.api.response.GetGenerationAndIdResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.article.Article;
import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.service.article.ArticleService;
import com.ssafy.moida.service.article.BoardDocumentService;
import com.ssafy.moida.service.article.BoardService;
import com.ssafy.moida.service.user.UserVolunteerService;
import com.ssafy.moida.utils.DtoValidationUtils;
import com.ssafy.moida.utils.TokenUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;
import java.util.List;

import java.util.Map;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * [세은] 인증 게시판 : 사용자 봉사 인증 + 관리자 공지사항
 */
@Tag(name="인증갤러리")
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;
    private final TokenUtils tokenUtils;
    private final DtoValidationUtils dtoValidationUtils;
    private final BoardService boardService;
    private final BoardDocumentService boardDocumentService;
    private final UserVolunteerService userVolunteerService;

    public ArticleController(ArticleService articleService, TokenUtils tokenUtils, DtoValidationUtils dtoValidationUtils,
                             BoardService boardService, BoardDocumentService boardDocumentService, UserVolunteerService userVolunteerService) {
        this.articleService = articleService;
        this.tokenUtils = tokenUtils;
        this.dtoValidationUtils = dtoValidationUtils;
        this.boardService = boardService;
        this.boardDocumentService = boardDocumentService;
        this.userVolunteerService = userVolunteerService;
    }

    /* Article 관련 */

    @Operation(summary = "사용자 인증글 작성", description = "사용자가 봉사 후기를 작성합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createArticle(
            @RequestPart(value = "article") CreateArticleReqDto createArticleReqDto,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 토큰 유효성 검증
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);

        // DTO NOT NULL 검증
        dtoValidationUtils.validateCreateArticleReqDto(createArticleReqDto);

        // DTO로 들어온 UsersVolunteer 안의 user_id와 일치하는지 검증
        UsersVolunteer usersVolunteer = userVolunteerService.findUsersVolunteerById(createArticleReqDto.getUsersVolunteerProjectId());
        if(loginUser.getId() != usersVolunteer.getUsers().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN_USER);
        }

        // 해당 usersVolunteer.state 가 DONE인지 검증
        if(!usersVolunteer.getStatus().equals(Status.DONE)){
            throw new CustomException(ErrorCode.INVALID_DTO_STATUS);
        }

        // 게시판에 저장 및 프로젝트 difficultyLevel 업데이트
        articleService.save(createArticleReqDto, usersVolunteer, file);

        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "전체 인증갤러리 조회(사용자 인증글만)", description = "전체 인증갤러리 글(사용자 봉사 인증글 + 공지사항)을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getArticles(
            @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "category", defaultValue = "ALL") @Schema(allowableValues = {"ALL", "CRANE", "SQUIRREL", "WILD_ANIMAL"}) String category,
            @RequestParam(name = "sort", defaultValue = "latest") @Schema(allowableValues = {"LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"}) String sort
    ){
        pageNumber -= 1;

        ArticleSortDto articleSortDto = new ArticleSortDto(pageNumber, pageSize, category, sort);
        dtoValidationUtils.validateArticleSortDto(articleSortDto);

        List<GetArticleResDto> articleList = articleService.getArticleList(articleSortDto);
        Long length = articleService.countArticleList(articleSortDto);

        return ResponseEntity.ok()
                .body(Map.of("articleList", articleList, "length", length));
    }

    @Operation(summary = "사용자 인증글 상세조회", description = "특정 사용자 인증글을 상세 조회합니다.")
    @GetMapping("/{articleid}")
    public ResponseEntity<GetArticleDetailResDto> getArticleDetails(@PathVariable("articleid") int articleId){
        if(!articleService.existsById((long) articleId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        return new ResponseEntity<>(articleService.getArticleDetailById((long) articleId), HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 삭제", description = "특정 사용자 인증글을 삭제합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping ("/{articleid}")
    public ResponseEntity<?> deleteArticle(
            @PathVariable("articleid") int articleId,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);

        Long userId = articleService.findById((long) articleId).getUsers().getId();

        // Admin 이거나 사용자가 작성한 글이 맞는 경우에만 삭제 가능
        if(!loginUser.getRole().equals(Role.ROLE_ADMIN)
                && loginUser.getId() != userId){
            throw new CustomException(ErrorCode.FORBIDDEN_USER);
        }

        // 삭제하려는 인증글이 없을 경우 오류 반환(404)
        if(!articleService.existsById((long) articleId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        articleService.delete((long) articleId);
        return new ResponseEntity<>("게시물 삭제 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 수정", description = "사용자가 인증글을 수정합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping
    public ResponseEntity<?> updateArticleDetails(
            @RequestBody UpdateArticleReqDto updateArticleReqDto,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);

        // 인증글 고유 아이디 필드 검증
        Long articleId = updateArticleReqDto.getId();
        if(articleId == null || articleId <= 0) {
            throw new IllegalArgumentException("인증글 아이디 필드가 존재하지 않거나 유효하지 않은 아이디입니다.");
        }

        // 수정하려는 인증글이 없을 경우 오류 반환(404)
        if(!articleService.existsById(updateArticleReqDto.getId())){
            return new ResponseEntity<>(ErrorCode.DATA_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }

        // 수정하려는 인증글 토큰 확인
        if(loginUser.getId()
                != articleService.findById(updateArticleReqDto.getId()).getUsers().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN_USER);
        }

        // 공지사항 내용 수정
        articleService.updateArticle(updateArticleReqDto);

        return new ResponseEntity<>("게시글 수정 완료", HttpStatus.OK);

    }

    /* Board 관련 */

    @Transactional
    @Operation(summary = "[관리자] 공지사항 작성", description = "관리자가 공지사항을 작성합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(path = "/board", consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createBoard(
            @RequestPart(value = "board") CreateBoardReqDto createBoardReqDto,
            @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 토큰 유효성 검증 및 관리자 확인
        Users admin = tokenUtils.validateAdminTokenAndGetUser(principalDetails, true);

        // DTO NOT NULL 검증
        dtoValidationUtils.validateCreateBoardReqDto(createBoardReqDto);

        // 해당 프로젝트에 이미 작성된 공지사항이 있는 경우 충돌 발생
        if(boardService.existsByProjectId(createBoardReqDto.getProjectId())){
            throw new CustomException(ErrorCode.DUPLICATE_BOARD_EXISTS);
        }

        // Board 데이터베이스 저장
        Board board = boardService.save(createBoardReqDto, admin);

        // 사진 데이터베이스 저장
        if(fileList != null && fileList.size() > 0){
            try {
                boardDocumentService.save(fileList, board);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return new ResponseEntity<>("공지사항 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "카테고리별 공지사항 조회", description = "공지사항을 카테고리별 조회합니다. 카테고리별 공지사항 기수 리스트와 가장 최신 공지사항을 반환합니다.")
    @GetMapping("/board/category/{category}")
    public ResponseEntity<GetBoardListByCategoryResDto> getBoardByCategory(
            @PathVariable("category") @Schema(description = "카테고리명", defaultValue = "CRANE") String category
    ){
        // 카테고리 존재 여부 검증
        dtoValidationUtils.validateCategory(category);

        // [프로젝트 아이디 + 기수] 반환
        List<GetGenerationAndIdResDto> generationList = boardService.getGenerationList(category);

        // 기수가 없는 경우 -> 프로젝트가 없는 경우 : 에러 반환
        if(generationList == null || generationList.size() == 0){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        GetBoardDetailResDto boardDetail = null;
        try{
            // 최근 공지글이 존재하는 경우
            boardDetail = boardService.getBoardDetailByProject(generationList.get(0).getId());
        } catch (CustomException e){
            // 프로젝트가 존재하지만 그에 따른 공지글이 없는 경우
            return new ResponseEntity<>(new GetBoardListByCategoryResDto(generationList, null), HttpStatus.OK);
        }

        return new ResponseEntity<>(new GetBoardListByCategoryResDto(generationList, boardDetail), HttpStatus.OK);
    }

    @Operation(summary = "공지사항 상세조회", description = "특정 공지사항을 상세 조회합니다.")
    @GetMapping("/board/{projectid}")
    public ResponseEntity<GetBoardDetailResDto> getBoardDetails(@PathVariable("projectid") int projectId){

        GetBoardDetailResDto boardDetail = null;
        try{
            // 공지글이 존재하는 경우
            boardDetail = boardService.getBoardDetailByProject((long) projectId);
        } catch (CustomException e){
            // 공지글이 존재하지 않는 경우 -> null 반환
            return new ResponseEntity<>(null, HttpStatus.OK);
        }

        return new ResponseEntity<>(boardDetail, HttpStatus.OK);
    }

    @Operation(summary = "[관리자] 공지사항 수정", description = "관리자가 공지사항을 수정합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/board")
    public ResponseEntity<?> updateBoardDetails(
            @RequestBody UpdateBoardReqDto updateBoardReqDto,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 관리자 토큰 검증
        tokenUtils.validateAdminTokenAndGetUser(principalDetails, true);

        Long boardId = updateBoardReqDto.getId();

        // 보드 고유 아이디 필드 검증
        if(boardId == null || boardId <= 0) {
            throw new IllegalArgumentException("공지 아이디 필드가 존재하지 않거나 유효하지 않은 아이디입니다.");
        }

        // 해당 보드 아이디가 존재하지 않는 경우 예외 처리
        if(!boardService.existsById(boardId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        // 공지사항 내용 수정
        boardService.updateBoard(updateBoardReqDto);

        return new ResponseEntity<>("[관리자] 공지사항 수정 완료", HttpStatus.OK);
    }
}