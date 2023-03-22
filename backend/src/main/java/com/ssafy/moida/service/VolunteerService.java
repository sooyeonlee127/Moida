package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.model.ProjectVolunteer;
import com.ssafy.moida.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        ProjectVolunteer projectVolunteer = ProjectVolunteer.builder()
                .startDate(LocalDateTime.parse(vd.getStartDate(), formatter))
                .endDate(LocalDateTime.parse(vd.getEndDate(), formatter))
                .difficultyLevel(vd.getDifficultyLevel())
                .location(vd.getLocation())
                .subject(vd.getSubject())
                .description(vd.getDescription())
                .build();

        volunteerRepository.save(projectVolunteer);
        return projectVolunteer;
    }
}
