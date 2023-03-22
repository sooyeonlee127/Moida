package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.Project;
import com.ssafy.moida.service.ProjectService;
import com.ssafy.moida.service.VolunteerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name="프로젝트(관리자 ver.)")
@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService projectService;
    private final VolunteerService volunteerService;

    public ProjectController(ProjectService projectService, VolunteerService volunteerService){
        this.projectService = projectService;
        this.volunteerService = volunteerService;
    }

    @Operation(summary = "프로젝트 생성", description = "새 프로젝트를 생성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createProject(
        @RequestPart(value = "info", required = true) CreateProjectReqDto createProjectReqDto,
        @RequestPart(value = "files", required = false) List<MultipartFile> files
    ){
        Project project = projectService.save(createProjectReqDto);

        // 봉사일시 데이터베이스 저장
        volunteerService.saveVolunteerDateInfo(project);

        // 사진 데이터베이스 저장


        return new ResponseEntity<>("프로젝트 생성 완료", HttpStatus.OK);
    }

    @Operation(summary = "프로젝트 정보 조회", description = "메인페이지에서 조회할 프로젝트의 가벼운 정보를 조회합니다.")
    @GetMapping
    public GetProjectResDto getProject(){

        return null;
    }

    @Operation(summary = "프로젝트 정보 상세 조회", description = "프로젝트 상세 페이지 정보를 조회합니다.")
    @GetMapping("/{projectid}")
    public ResponseEntity<GetProjectDetailResDto> getProjectDetail(@PathVariable(value = "projectid") int projectId){
        GetProjectDetailResDto getProjectDetailResDto = projectService.getProjectDetail((long) projectId);
        return new ResponseEntity<>(getProjectDetailResDto, HttpStatus.OK);
    }
}
