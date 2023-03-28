package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.VolunteerReqDto;
import com.ssafy.moida.api.response.DateInfoResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectVolunteer;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.repository.project.VolunteerRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 봉사 기능 - 봉사 DB 테이블 사이의 브릿지
 */
@Service
@Transactional
public class ProjectVolunteerService {
    private final VolunteerRepository volunteerRepository;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;
    private final UsersVolunteerRepository usersVolunteerRepository;

    public ProjectVolunteerService(VolunteerRepository volunteerRepository, VolunteerDateInfoRepository volunteerDateInfoRepository,
        UsersVolunteerRepository usersVolunteerRepository){
        this.volunteerRepository = volunteerRepository;
        this.volunteerDateInfoRepository = volunteerDateInfoRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
    }

    /**
     * 봉사 테이블 데이터 추가
     * @param vd
     * @return ProjectVolunteer(엔티티)
     */
    public ProjectVolunteer saveProjectVolunteer(VolunteerReqDto vd){
        ProjectVolunteer projectVolunteer = ProjectVolunteer.builder()
                .startDate(LocalDateTime.of(LocalDate.parse(vd.getStartDate()), LocalTime.MIDNIGHT))
                .endDate(LocalDateTime.of(LocalDate.parse(vd.getEndDate()), LocalTime.MAX))
                .difficultyLevel(vd.getDifficultyLevel())
                .location(vd.getLocation())
                .capacityPerDate(vd.getCapacityPerDate())
                .subject(vd.getSubject())
                .description(vd.getDescription())
                .build();
        volunteerRepository.save(projectVolunteer);
        return projectVolunteer;
    }

    /**
     * 봉사 일시 테이블 데이터 추가 : 봉사 일자 사이의 LocalDate 정보를 v_date_info 테이블에 추가
     * @param p
     */
    @Transactional
    public void saveVolunteerDateInfo(Project p){
        ProjectVolunteer pv = p.getProjectVolunteer();

        LocalDateTime sd = pv.getStartDate();
        LocalDateTime ed = pv.getEndDate();
        LocalDate startDate = LocalDate.of(sd.getYear(), sd.getMonth(), sd.getDayOfMonth());
        LocalDate endDate = LocalDate.of(ed.getYear(), ed.getMonth(), ed.getDayOfMonth());

        // 두 날 사이의 날짜 리스트 생성
        List<LocalDate> dates = startDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

        for(int i = 0; i < dates.size(); i++){
            VolunteerDateInfo volunteerDateInfo = VolunteerDateInfo.builder()
                .volunteerDate(dates.get(i))
                .capacity(0)
                .maxCapacity(pv.getCapacityPerDate())
                .project(p)
                .build();
            volunteerDateInfoRepository.save(volunteerDateInfo);
        }
    }

    /**
     * [세은] 봉사 일시 테이블 데이터 추가
     * @param id
     * @return
     */
    public VolunteerDateInfo findVolunteerDateInfoById(Long id){
        return volunteerDateInfoRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }

    public List<DateInfoResDto> getVolunteerDateInfoByProject(Project project){
        List<VolunteerDateInfo> dateList = volunteerDateInfoRepository.findByProject(project);
        return dateList.stream()
            .map(date -> new DateInfoResDto(date.getId(), date.getVolunteerDate().toString(), date.getMaxCapacity(), date.getCapacity()))
            .collect(Collectors.toList());
    }

    /**
     * [세은] 봉사 일자 테이블 인원수 업데이트 (+1)
     * @param volunteerDateInfo
     */
    @Transactional
    public void updateCapacity(VolunteerDateInfo volunteerDateInfo){
        volunteerDateInfo.updateCapacity(volunteerDateInfo.getCapacity() + 1);
    }

    /**
     * [세은] 해당 봉사 일자에 사용자가 이미 신청하였는지 확인
     * @param volunteerDateInfo
     * @return
     */
    public boolean existsByVolunteerDateInfo(VolunteerDateInfo volunteerDateInfo){
        return usersVolunteerRepository.existsByVolunteerDateInfo(volunteerDateInfo);
    }

    /**
     * [세은] UsersVolunteer에 사용자 봉사 신청 추가
     * @param users
     * @param volunteerDateInfo
     */
    @Transactional
    public void saveUsersVolunteer(Users users, VolunteerDateInfo volunteerDateInfo){
        UsersVolunteer usersVolunteer = UsersVolunteer.builder()
            .status(Status.REGISTER)
            .users(users)
            .volunteerDateInfo(volunteerDateInfo)
            .build();
        usersVolunteerRepository.save(usersVolunteer);
    }
}
