package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.ProjectDto;
import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.api.request.CreateProjectReqDto;
import com.ssafy.moida.api.response.GetProjectResDto;
import com.ssafy.moida.model.Project;
import com.ssafy.moida.repository.ProjectRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Transactional
    public void save(CreateProjectReqDto createProjectReqDto){
        ProjectDto pd = createProjectReqDto.getProjectDto();
        DonationDto dd = createProjectReqDto.getDonationDto();
        VolunteerDto vd = createProjectReqDto.getVolunteerDto();

        // 기부 데이터베이스에 저장


        // 봉사 데이터베이스에 저장


        // 프로젝트 데이터베이스에 저장
        Project project = Project.builder().subject(pd.getSubject()).description(pd.getDescription()).generation(pd.getGeneration()).build();
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
    public List<GetProjectResDto> getProjectDetail(long projectId){
        projectRepository.findById(projectId);
        return null;
    }


}
