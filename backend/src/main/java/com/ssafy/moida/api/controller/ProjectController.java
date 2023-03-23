package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.project.ProjectPictureService;
import com.ssafy.moida.service.project.ProjectService;
import com.ssafy.moida.service.project.VolunteerService;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * [세은] 프로젝트 컨트롤러
 */
@Tag(name="프로젝트(관리자 ver.)")
@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final VolunteerService volunteerService;
    private final ProjectPictureService projectPictureService;

    public ProjectController(ProjectService projectService, UserService userService,
        VolunteerService volunteerService, ProjectPictureService projectPictureService){
        this.projectService = projectService;
        this.userService = userService;
        this.volunteerService = volunteerService;
        this.projectPictureService = projectPictureService;
    }

    @Operation(summary = "프로젝트 생성", description = "새 프로젝트를 생성합니다.")
    @PostMapping(consumes = {
        MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> createProject(
        @RequestPart(value = "info", required = true) CreateProjectReqDto createProjectReqDto,
        @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
        @RequestPart(value = "files", required = false) List<MultipartFile> fileList,
        @AuthenticationPrincipal PrincipalDetails principal
    ){

        Users loginUser = null;
        try {
            loginUser = userService.findByUsername(principal.getUsername());
        } catch (CustomException e) {
            return new ResponseEntity<>(ErrorCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        if(loginUser.getRole().equals("ROLE_ADMIN")){
            return new ResponseEntity<>(ErrorCode.UNAUTHORIZED_USER, HttpStatus.UNAUTHORIZED);
        }

        Project project = projectService.save(createProjectReqDto, thumbnail);
        // 봉사일시 데이터베이스 저장
        volunteerService.saveVolunteerDateInfo(project);

        // 사진 데이터베이스 저장
        if(fileList != null && fileList.size() > 0){
            try {
                projectPictureService.save(fileList, project);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return new ResponseEntity<>("프로젝트 생성 완료", HttpStatus.OK);
    }

    @Operation(summary = "프로젝트 정보 조회", description = "메인페이지에서 조회할 프로젝트의 가벼운 정보를 조회합니다.")
    @GetMapping
    public ResponseEntity<List<GetProjectResDto>> getProject(){
        List<GetProjectResDto> getProjectResDtoList = projectService.getProject();
        return new ResponseEntity<>(getProjectResDtoList, HttpStatus.OK);
    }

    @Operation(summary = "프로젝트 정보 상세 조회", description = "프로젝트 상세 페이지 정보를 조회합니다.")
    @GetMapping("/{projectid}")
    public ResponseEntity<GetProjectDetailResDto> getProjectDetail(@PathVariable(value = "projectid") int projectId){
        GetProjectDetailResDto getProjectDetailResDto = projectService.getProjectDetail((long) projectId);
        return new ResponseEntity<>(getProjectDetailResDto, HttpStatus.OK);
    }
}
