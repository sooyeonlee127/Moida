package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectDetailResDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.Category;
import com.ssafy.moida.model.Project;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.model.ProjectVolunteer;
import com.ssafy.moida.repository.ProjectRepository;
import com.ssafy.moida.repository.VolunteerRepository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private DonationService donationService;
    @Autowired
    private VolunteerService volunteerService;

    @Transactional
    public void save(CreateProjectReqDto createProjectReqDto){
        ProjectDto pd = createProjectReqDto.getProjectDto();

        // 기부 데이터베이스에 저장
        ProjectDonation projectDonation = donationService.save(createProjectReqDto.getDonationDto());

        // 봉사 데이터베이스에 저장
        ProjectVolunteer projectVolunteer = volunteerService.save(createProjectReqDto.getVolunteerDto());
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
     * @return
     */
    public GetProjectDetailResDto getProjectDetail(long projectId){
        Project projects = projectRepository.findById(projectId);
        return new GetProjectDetailResDto(projects, new ArrayList<>());
    }
}
