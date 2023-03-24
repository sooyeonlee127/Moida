package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.api.request.CreateBoardReqDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.ArticleService;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * [세은] 인증 게시판 : 사용자 봉사 인증 + 관리자 공지사항
 */
@Tag(name="인증갤러리")
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final UserService userService;
    private final ArticleService articleService;

    public ArticleController(UserService userService, ArticleService articleService) {
        this.userService = userService;
        this.articleService = articleService;
    }

    @Operation(summary = "사용자 봉사 후기 작성", description = "사용자가 봉사 후기를 작성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createArticle(
        @RequestPart(value = "article") CreateArticleReqDto createArticleReqDto,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 프론트에서 유효한 토큰이 들어오지 않을 경우
        if(principalDetails == null){
            return new ResponseEntity<>(ErrorCode.INVALID_CLIENT_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 토큰 유효성 검증
        Users loginUser = null;
        try {
            loginUser = userService.findByEmail(principalDetails.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // 게시판에 저장
        articleService.save(createArticleReqDto, file);

        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "관리자 봉사 인증 작성", description = "관리자가 봉사 인증글(공지)을 작성합니다.")
    @PostMapping(path = "/board", consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createBoard(
        @RequestPart(value = "article") CreateBoardReqDto createBoardReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
        @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 프론트에서 유효한 토큰이 들어오지 않을 경우
        if(principalDetails == null){
            return new ResponseEntity<>(ErrorCode.INVALID_CLIENT_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 토큰 유효성 검증 (관리자인지 확인)
        Users loginUser = null;
        try {
            loginUser = userService.findByEmail(principalDetails.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        // 관리자가 아닌 경우, 권한 없음 예외 발생
        if(!loginUser.getRole().equals(Role.ROLE_ADMIN)){
            return new ResponseEntity<>(ErrorCode.UNAUTHORIZED_USER, HttpStatus.UNAUTHORIZED);
        }



        return new ResponseEntity<>("공지사항 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "전체 봉사 게시글 조회", description = "전체 봉사 게시글을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getArticlesAndBoards(){
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "봉사 게시글(공지사항) 상세조회", description = "특정 공지사항을 상세 조회합니다.")
    @GetMapping("/board/{boardid}")
    public ResponseEntity<?> getBoardDetails(@PathVariable("boardid") int boardId){
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 상세조회", description = "특정 사용자 인증글을 상세 조회합니다.")
    @GetMapping("/{articleid}")
    public ResponseEntity<?> getArticleDetails(@PathVariable("articleid") int articleId){
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 인증글 삭제", description = "특정 사용자 인증글을 삭제합니다.")
    @DeleteMapping ("/{articleid}")
    public ResponseEntity<?> deleteArticle(@PathVariable("articleid") int articleId){
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

}
