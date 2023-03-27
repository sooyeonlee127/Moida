package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.api.request.CreateBoardReqDto;
import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.api.response.GetArticleResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.service.article.ArticleService;
import com.ssafy.moida.service.article.BoardDocumentService;
import com.ssafy.moida.service.article.BoardService;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.DtoValidationUtils;
import com.ssafy.moida.utils.TokenUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;
import java.util.List;

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
    private final UserService userService;
    private final TokenUtils tokenUtils;
    private final DtoValidationUtils dtoValidationUtils;
    private final BoardService boardService;
    private final BoardDocumentService boardDocumentService;

    public ArticleController(ArticleService articleService, UserService userService, TokenUtils tokenUtils, DtoValidationUtils dtoValidationUtils,
                             BoardService boardService, BoardDocumentService boardDocumentService) {
        this.articleService = articleService;
        this.userService = userService;
        this.tokenUtils = tokenUtils;
        this.dtoValidationUtils = dtoValidationUtils;
        this.boardService = boardService;
        this.boardDocumentService = boardDocumentService;
    }

    @Operation(summary = "사용자 인증글 작성", description = "사용자가 봉사 후기를 작성합니다.")
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
        UsersVolunteer usersVolunteer = userService.findUsersVolunteerById(createArticleReqDto.getUsersVolunteerProjectId());
        if(loginUser.getId() != usersVolunteer.getUsers().getId()){
            throw new CustomException(ErrorCode.UNAUTHORIZED_USER);
        }

        // 해당 usersVolunteer.state 가 DONE인지 검증
        if(!usersVolunteer.getStatus().equals(Status.DONE)){
            throw new CustomException(ErrorCode.INVALID_DTO_STATUS);
        }

        // 게시판에 저장 및 프로젝트 difficultyLevel 업데이트
        articleService.save(createArticleReqDto, usersVolunteer, file);

        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Transactional
    @Operation(summary = "[관리자] 공지사항 작성", description = "관리자가 공지사항을 작성합니다.")
    @PostMapping(path = "/board", consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createBoard(
        @RequestPart(value = "article") CreateBoardReqDto createBoardReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
        @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 토큰 유효성 검증 및 관리자 확인
        Users admin = tokenUtils.validateAdminTokenAndGetUser(principalDetails, true);

        // DTO NOT NULL 검증
        dtoValidationUtils.validateCreateBoardReqDto(createBoardReqDto);

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

    @Operation(summary = "전체 인증갤러리 조회", description = "전체 인증갤러리 글(사용자 봉사 인증글 + 공지사항)을 조회합니다.")
    @GetMapping
    public ResponseEntity<GetArticleResDto> getArticlesAndBoards(){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Operation(summary = "공지사항 상세조회", description = "특정 공지사항을 상세 조회합니다.")
    @GetMapping("/board/{boardid}")
    public ResponseEntity<?> getBoardDetails(@PathVariable("boardid") int boardId){
        if(!boardService.existsById((long) boardId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "[관리자] 공지사항 수정", description = "관리자가 공지사항을 수정합니다.")
    @PutMapping("/board/{boardid}")
    public ResponseEntity<?> updateBoardDetails(@PathVariable("boardid") int boardId){
        if(!boardService.existsById((long) boardId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        return new ResponseEntity<>("[관리자] 공지사항 수정 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 상세조회", description = "특정 사용자 인증글을 상세 조회합니다.")
    @GetMapping("/{articleid}")
    public ResponseEntity<GetArticleDetailResDto> getArticleDetails(@PathVariable("articleid") int articleId){
        if(!articleService.existsById((long) articleId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        return new ResponseEntity<>(articleService.findById((long) articleId), HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 삭제", description = "특정 사용자 인증글을 삭제합니다.")
    @DeleteMapping ("/{articleid}")
    public ResponseEntity<?> deleteArticle(@PathVariable("articleid") int articleId){
        // 삭제하려는 인증글이 없을 경우 오류 반환(404)
        if(!articleService.existsById((long) articleId)){
            return new ResponseEntity<>(ErrorCode.DATA_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        articleService.delete((long) articleId);
        return new ResponseEntity<>("게시물 삭제 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 수정", description = "사용자가 인증글을 수정합니다.")
    @PutMapping ("/{articleid}")
    public ResponseEntity<?> updateArticleDetails(@PathVariable("articleid") int articleId){
        // 수정하려는 인증글이 없을 경우 오류 반환(404)
        if(!articleService.existsById((long) articleId)){
            return new ResponseEntity<>(ErrorCode.DATA_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("게시물 수정 완료", HttpStatus.OK);
    }
}
