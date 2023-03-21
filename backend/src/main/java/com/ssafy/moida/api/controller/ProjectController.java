package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name="프로젝트(관리자 ver.)")
@RestController
@RequestMapping("/project")
public class ProjectController {
    @Operation(summary = "프로젝트 생성", description = "새 프로젝트를 생성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createProject(
        @RequestPart(value = "info", required = true) CreateProjectReqDto createProjectReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> files
    ){
        System.out.println(createProjectReqDto);
        return new ResponseEntity<>("프로젝트 생성 완료", HttpStatus.OK);
    }

    @Operation(summary = "프로젝트 정보 조회", description = "메인페이지에서 조회할 프로젝트의 가벼운 정보를 조회합니다.")
    @GetMapping
    public GetProjectResDto getProject(){

        return null;
    }

    @Operation(summary = "프로젝트 정보 상세 조회", description = "프로젝트 상세 페이지 정보를 조회합니다.")
    @GetMapping("/{projectid}")
    public ResponseEntity<?> getProjectDetail(@RequestParam(value = "projectid") Long projectId){
        return new ResponseEntity<>("프로젝트 조회 완료", HttpStatus.OK);
    }
}
