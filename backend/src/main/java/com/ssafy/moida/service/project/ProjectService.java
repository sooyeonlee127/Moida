package com.ssafy.moida.service.project;

import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.project.Category;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.model.project.ProjectVolunteer;
import com.ssafy.moida.repository.project.ProjectRepository;

import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProjectService {
    private final ProjectRepository projectRepository;
    @Autowired
    private DonationService donationService;
    @Autowired
    private VolunteerService volunteerService;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    /**
     * 프로젝트 테이블 데이터 추가
     * @param createProjectReqDto
     */
    @Transactional
    public Project save(CreateProjectReqDto createProjectReqDto){
        // 기부 데이터베이스에 저장
        ProjectDonation projectDonation = donationService.save(createProjectReqDto.getDonationDto());

        // 봉사 데이터베이스에 저장
        ProjectVolunteer projectVolunteer = volunteerService.saveProjectVolunteer(createProjectReqDto.getVolunteerDto());

        // 프로젝트 데이터베이스에 저장
        ProjectDto pd = createProjectReqDto.getProjectDto();
        Project project = Project.builder()
            .subject(pd.getSubject())
            .description(pd.getDescription())
            .generation(pd.getGeneration())
            .category(Category.valueOf(pd.getCategory()))
            .projectVolunteer(projectVolunteer)
            .projectDonation(projectDonation)
            .build();
        projectRepository.save(project);

        return project;
    }

    /**
     * 프로젝트 정보 조회(메인 페이지)
     * @return
     */
    public List<GetProjectResDto> getProject(){
        // projectRepository.findAll()
        return null;
    }

    /**
     * 프로젝트 정보 상세 조회(상세 조회)
     * @return GetProjectDetailResDto
     */
    public GetProjectDetailResDto getProjectDetail(Long projectId){
        Project projects = projectRepository.findById(projectId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return new GetProjectDetailResDto(projects, new ArrayList<>());
    }
}
