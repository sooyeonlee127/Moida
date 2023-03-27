package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.ProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.model.project.ProjectVolunteer;
import com.ssafy.moida.repository.project.ProjectRepository;

import com.ssafy.moida.utils.S3Uploader;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final S3Uploader s3Uploader;
    private final ProjectPictureService projectPictureService;

    public ProjectService(ProjectRepository projectRepository, S3Uploader s3Uploader,
        ProjectPictureService projectPictureService){
        this.projectRepository = projectRepository;
        this.s3Uploader = s3Uploader;
        this.projectPictureService = projectPictureService;
    }

    /**
     * [세은] 프로젝트 테이블 데이터 추가
     * @param projectReqDto
     * @param projectVolunteer
     * @param projectDonation
     * @param thumbnail
     * @return
     */
    @Transactional
    public Project save(ProjectReqDto projectReqDto, ProjectVolunteer projectVolunteer, ProjectDonation projectDonation, MultipartFile thumbnail){
        /*
        프로젝트 데이터베이스에 저장
        저장 시에 generation은 가장 최신 generation 을 찾아 넣어주기
         */
        List<Project> projectList = getGenerationListByCategory(projectReqDto.getCategory());
        int generation = 1;
        if(projectList != null && projectList.size() > 0) generation = projectList.get(0).getGeneration() + 1;

        // 메인 이미지 s3 url 반환
        String thumbnailUrl = s3Uploader.uploadFileToS3(thumbnail, "static/project");

        Project project = Project.builder()
            .subject(projectReqDto.getSubject())
            .description(projectReqDto.getDescription())
            .generation(generation)
            .thumbnail(thumbnailUrl)
            .category(projectReqDto.getCategory())
            .pointPerMoi(projectReqDto.getPointPerMoi())
            .projectVolunteer(projectVolunteer)
            .projectDonation(projectDonation)
            .build();
        projectRepository.save(project);

        return project;
    }

    /**
     * [세은] 아이디로 프로젝트 조회
     * @param projectId
     * @return
     */
    public Project findById(Long projectId){
        return projectRepository.findById(projectId).orElseThrow(
            () -> new CustomException(ErrorCode.DATA_NOT_FOUND)
        );
    }

    /**
     * [세은] 프로젝트 아이디로 프로젝트 존재 여부 반환
     * @param projectId
     * @return
     */
    public boolean existsById(Long projectId){
        return projectRepository.existsById(projectId);
    }

    /**
     * [세은] 프로젝트 정보 조회(메인 페이지)
     * 현재 카테고리에서 가장 최근 generation 만 select
     * @return
     */
    public List<GetProjectResDto> getProject(){
        List<Project> projectList = projectRepository.getNewestProjectByCategory();
        List<GetProjectResDto> results = new ArrayList<>();

        for (int i = 0; i < projectList.size(); i++) {
            results.add(new GetProjectResDto(projectList.get(i)));
        }

        return results;
    }

    /**
     * [세은] 프로젝트 정보 상세 조회(상세 조회)
     * @return GetProjectDetailResDto
     */
    public GetProjectDetailResDto getProjectDetail(Long projectId){
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<String> fileList = projectPictureService.getFileList(project);
        return new GetProjectDetailResDto(project, fileList);
    }

    /**
     * [세은] 카테고리에 따른 프로젝트 리스트 반환
     * @param category
     * @return
     */
    public  List<Project> getGenerationListByCategory(String category){
        return projectRepository.getNewestProjectByCategory(category);
    }
}
