package com.ssafy.moida.service.project;

import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectVolunteer;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.repository.project.VolunteerRepository;
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
public class VolunteerService {
    private final VolunteerRepository volunteerRepository;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;

    public VolunteerService(VolunteerRepository volunteerRepository, VolunteerDateInfoRepository volunteerDateInfoRepository){
        this.volunteerRepository = volunteerRepository;
        this.volunteerDateInfoRepository = volunteerDateInfoRepository;
    }

    /**
     * 봉사 테이블 데이터 추가
     * @param vd
     * @return ProjectVolunteer(엔티티)
     */
    public ProjectVolunteer saveProjectVolunteer(VolunteerDto vd){
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

        /* 두 날 사이의 날짜 리스트 생성 */
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

}
