package com.ssafy.moida.service.project;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.repository.project.DonationRepository;
import java.time.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 기부 기능 - 기부 DB 테이블 사이의 브릿지
 */
@Service
@Transactional
public class DonationService {
    private final DonationRepository donationRepository;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public ProjectDonation save(DonationDto dd){
//        dd.setAmount(0L);
//        ProjectDonation projectDonation = modelMapper.map(dd, ProjectDonation.class);

        ProjectDonation projectDonation = ProjectDonation.builder()
            .startDate(LocalDateTime.of(LocalDate.parse(dd.getStartDate()), LocalTime.MIDNIGHT))
            .endDate(LocalDateTime.of(LocalDate.parse(dd.getEndDate()), LocalTime.MAX))
            .amount(0L)
            .targetAmount(dd.getTargetAmount())
            .subject(dd.getSubject())
            .description(dd.getDescription())
            .build();

        System.out.println(projectDonation);
        donationRepository.save(projectDonation);
        return projectDonation;
    }
}
