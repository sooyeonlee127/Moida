package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.ProjectReqDto;
import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.model.project.ProjectVolunteer;
import com.ssafy.moida.repository.project.ProjectRepository;

import com.ssafy.moida.utils.S3Uploader;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final S3Uploader s3Uploader;
    @Autowired
    private DonationService donationService;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private ProjectPictureService projectPictureService;

    public ProjectService(ProjectRepository projectRepository, S3Uploader s3Uploader){
        this.projectRepository = projectRepository;
        this.s3Uploader = s3Uploader;
    }

    /**
     * [세은] 프로젝트 테이블 데이터 추가
     * @param createProjectReqDto
     */
    @Transactional
    public Project save(CreateProjectReqDto createProjectReqDto, MultipartFile thumbnail){
        // 기부 데이터베이스에 저장
        ProjectDonation projectDonation = donationService.save(createProjectReqDto.getDonationReqDto());

        // 봉사 데이터베이스에 저장
        ProjectVolunteer projectVolunteer = volunteerService.saveProjectVolunteer(createProjectReqDto.getVolunteerDto());

        /*
        프로젝트 데이터베이스에 저장
        저장 시에 generation은 가장 최신 generation 을 찾아 넣어주기
         */
        ProjectReqDto pd = createProjectReqDto.getProjectReqDto();
        List<Project> projectList = projectRepository.findNewestGenerationByCategory(pd.getCategory());

        int generation = 1;
        if(projectList != null && projectList.size() > 0) generation = projectList.get(0).getGeneration() + 1;

        String thumbnailUrl = s3Uploader.uploadFileToS3(thumbnail, "static/project");
        Project project = Project.builder()
            .subject(pd.getSubject())
            .description(pd.getDescription())
            .generation(generation)
            .thumbnail(thumbnailUrl)
            .category(pd.getCategory())
            .projectVolunteer(projectVolunteer)
            .projectDonation(projectDonation)
            .build();
        projectRepository.save(project);

        return project;
    }

    /**
     * [세은] 프로젝트 정보 조회(메인 페이지)
     * 현재 카테고리에서 가장 최근 generation 만 select
     * @return
     */
    public List<GetProjectResDto> getProject(){
        List<Project> projectList = projectRepository.findNewestProjectByCategory();
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
}
