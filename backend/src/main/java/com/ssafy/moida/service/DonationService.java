package com.ssafy.moida.service;

import com.ssafy.moida.api.common.DonationDto;
import com.ssafy.moida.model.ProjectDonation;
import com.ssafy.moida.repository.DonationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DonationService {
    private DonationRepository donationRepository;

    public ProjectDonation save(DonationDto dd){
        ProjectDonation pd = ProjectDonation.builder()
//            .startDate(dd.getStartDate())
//            .endDate(dd.getEndDate())
            .amount(0L)
            .targetAmount(dd.getTargetAmount())
            .subject(dd.getSubject())
            .description(dd.getDescription())
            .build();

        donationRepository.save(pd);
        return pd;
    }
}
