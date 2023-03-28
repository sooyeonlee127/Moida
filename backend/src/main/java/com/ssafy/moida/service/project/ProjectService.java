package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.ProjectReqDto;
import com.ssafy.moida.api.request.UpdateDonationReqDto;
import com.ssafy.moida.api.request.UpdateProjectReqDto;
import com.ssafy.moida.api.request.UpdateVolunteerReqDto;
import com.ssafy.moida.api.response.DateInfoResDto;
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
import java.util.stream.Collectors;
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
    private final ProjectVolunteerService projectVolunteerService;
    private final ProjectDonationService projectDonationService;

    public ProjectService(ProjectRepository projectRepository, S3Uploader s3Uploader,
        ProjectPictureService projectPictureService,
        ProjectVolunteerService projectVolunteerService,
        ProjectDonationService projectDonationService){
        this.projectRepository = projectRepository;
        this.s3Uploader = s3Uploader;
        this.projectPictureService = projectPictureService;
        this.projectVolunteerService = projectVolunteerService;
        this.projectDonationService = projectDonationService;
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
     * [세은] 프로젝트 아이디로 데이터 존재 여부 확인 후 예외 처리
     * @param projectId
     */
    public void existsProjectById(Long projectId){
        if(!projectRepository.existsById(projectId)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
    }

    /**
     * [세은] 프로젝트 정보 조회(메인 페이지)
     * 현재 카테고리에서 가장 최근 generation 만 select
     * @return
     */
    public List<GetProjectResDto> getProject(){
        List<Project> projectList = projectRepository.getNewestProjectByCategory();
        return projectList.stream()
            .map(project -> new GetProjectResDto(project))
            .collect(Collectors.toList());
    }

    /**
     * [세은] 프로젝트 정보 상세 조회(상세 조회)
     * @return GetProjectDetailResDto
     */
    public GetProjectDetailResDto getProjectDetail(Long projectId){
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<String> fileList = projectPictureService.getFileList(project);
        List<DateInfoResDto> dates = projectVolunteerService.getVolunteerDateInfoByProject(project);
        return new GetProjectDetailResDto(project, fileList, dates);
    }

    /**
     * [세은] 카테고리에 따른 프로젝트 리스트 반환
     * @param category
     * @return
     */
    public  List<Project> getGenerationListByCategory(String category){
        return projectRepository.getNewestProjectByCategory(category);
    }

    /**
     * [세은] 프로젝트 정보 수정
     * @param updateProjectReqDto
     */
    @Transactional
    public void updateProjectDetail(UpdateProjectReqDto updateProjectReqDto){
        UpdateDonationReqDto updateDonationReqDto = updateProjectReqDto.getUpdateDonationReqDto();
        UpdateVolunteerReqDto updateVolunteerReqDto = updateProjectReqDto.getUpdateVolunteerReqDto();

        if(updateProjectReqDto.getId() == null || updateProjectReqDto.getId() <= 0){
            throw new IllegalArgumentException("프로젝트 아이디 필드가 존재하지 않거나 유효하지 않은 아이디입니다.");
        }

        // 프로젝트 정보 수정
        Project project = projectRepository.findById(updateProjectReqDto.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        project.updateProjectDetails(updateProjectReqDto);

        // 기부 정보 수정 요청이 들어올 경우
        if(updateDonationReqDto != null){
            // 기부 고유 아이디가 데이터베이스에 존재하는지 확인
            projectDonationService.existsDonationById(updateDonationReqDto.getId());
            ProjectDonation projectDonation = projectDonationService.findDonationById(updateDonationReqDto.getId());
            projectDonation.updateProjectDonationDetails(updateDonationReqDto);
        }

        // 봉사 정보를 수정할 경우
        if(updateVolunteerReqDto != null){
            // 봉사 고유 아이디가 데이터베이스에 존재하는지 확인
            projectVolunteerService.existsVolunteerById(updateVolunteerReqDto.getId());
            ProjectVolunteer projectVolunteer = projectVolunteerService.findVolunteerById(updateVolunteerReqDto.getId());
            projectVolunteer.updateProjectVolunteerDetails(updateVolunteerReqDto);
        }
    }
}
