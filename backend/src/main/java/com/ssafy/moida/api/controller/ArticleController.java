package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * [세은] 인증 게시판 : 사용자 봉사 인증 + 관리자 인증
 */
@RestController
@RequestMapping("/article")
public class ArticleController {
    private final UserService userService;

    public ArticleController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "사용자 봉사 후기 작성", description = "사용자가 봉사 후기를 작성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createArticle(
        @RequestPart(value = "article") CreateArticleReqDto createArticleReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
        @AuthenticationPrincipal PrincipalDetails principal
    ){
        Users loginUser = null;
        try {
            loginUser = userService.findByUsername(principal.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "관리자 봉사 인증 작성", description = "관리자가 봉사 인증글을 작성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createBoard(
        @RequestPart(value = "board") CreateArticleReqDto createArticleReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
        @AuthenticationPrincipal PrincipalDetails principal
    ){
        Users loginUser = null;
        try {
            loginUser = userService.findByUsername(principal.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }

    @Operation(summary = "전체 봉사 게시글 조회", description = "전체 봉사 게시글을 조회합니다.")
    @GetMapping
    public ResponseEntity<?> getArticlesAndBoards(){
        return new ResponseEntity<>("게시물 작성 완료", HttpStatus.OK);
    }
}
