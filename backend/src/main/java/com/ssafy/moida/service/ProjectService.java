package com.ssafy.moida.service;

import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.Category;
import com.ssafy.moida.model.Project;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.model.ProjectVolunteer;
import com.ssafy.moida.repository.ProjectRepository;

import com.ssafy.moida.util.error.ErrorCode;
import com.ssafy.moida.util.exception.CustomException;
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
    public void save(CreateProjectReqDto createProjectReqDto){
        ProjectDto pd = createProjectReqDto.getProjectDto();

        // 기부 데이터베이스에 저장
        // 만약에 저장이 안될 경우, 예외 처리 후 이후 로직 실행을 막아야 함.
        ProjectDonation projectDonation = donationService.save(createProjectReqDto.getDonationDto());

        // 봉사 데이터베이스에 저장
        // 만약에 저장이 안될 경우, 예외 처리 후 이후 로직 실행을 막아야 함.
        ProjectVolunteer projectVolunteer = volunteerService.saveProjectVolunteer(createProjectReqDto.getVolunteerDto());

        // 프로젝트 데이터베이스에 저장
        Project project = Project.builder()
            .subject(pd.getSubject())
            .description(pd.getDescription())
            .generation(pd.getGeneration())
            .category(Category.valueOf(pd.getCategory()))
            .projectVolunteer(projectVolunteer)
            .projectDonation(projectDonation)
            .build();
        projectRepository.save(project);

        // 봉사일시 데이터베이스 저장
        volunteerService.saveVolunteerDateInfo(project);
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
