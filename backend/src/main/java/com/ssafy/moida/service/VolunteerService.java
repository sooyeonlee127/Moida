package com.ssafy.moida.service;

import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.model.ProjectVolunteer;
import com.ssafy.moida.repository.VolunteerRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 봉사 기능 - 봉사 DB 테이블 사이의 브릿지
 */
@Service
@Transactional
public class VolunteerService {
    private final VolunteerRepository volunteerRepository;

    public VolunteerService(VolunteerRepository volunteerRepository){
        this.volunteerRepository = volunteerRepository;
    }

    public ProjectVolunteer save(VolunteerDto vd){
        // 봉사 테이블에 추가
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
}
