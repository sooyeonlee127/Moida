package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.api.common.VolunteerDto;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.model.ProjectVolunteer;
import com.ssafy.moida.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class VolunteerService {
    @Autowired
    private VolunteerRepository volunteerRepository;

    public ProjectVolunteer save(VolunteerDto vd){
        ProjectVolunteer pv = ProjectVolunteer.builder()
//            .startDate(dd.getStartDate())
//            .endDate(dd.getEndDate())
            .difficultyLevel(vd.getDifficultyLevel())
            .subject(vd.getSubject())
            .description(vd.getDescription())
            .location(vd.getLocation())
            .build();

        volunteerRepository.save(pv);
        return pv;
    }
}
