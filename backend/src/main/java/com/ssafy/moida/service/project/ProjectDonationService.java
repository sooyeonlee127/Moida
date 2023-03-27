package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.DonationReqDto;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.repository.project.DonationRepository;
import java.time.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectDonationService {
    private final DonationRepository donationRepository;

    public ProjectDonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    /**
     * [세은] 프로젝트 기부 테이블 저장
     *
     * @param dd
     * @param pointPerMoi
     * @return
     */
    public ProjectDonation save(DonationReqDto dd, Long pointPerMoi){

        ProjectDonation projectDonation = ProjectDonation.builder()
            .startDate(LocalDateTime.of(LocalDate.parse(dd.getStartDate()), LocalTime.MIDNIGHT))
            .endDate(LocalDateTime.of(LocalDate.parse(dd.getEndDate()), LocalTime.MAX))
            .amount(0L)
            .targetAmount(dd.getTargetAmount() * pointPerMoi)
            .subject(dd.getSubject())
            .description(dd.getDescription())
            .build();

        donationRepository.save(projectDonation);
        return projectDonation;
    }
}
