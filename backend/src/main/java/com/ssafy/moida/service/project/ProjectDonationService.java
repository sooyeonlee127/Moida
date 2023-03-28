package com.ssafy.moida.service.project;

import com.ssafy.moida.api.request.DonationReqDto;
import com.ssafy.moida.model.project.ProjectDonation;
import com.ssafy.moida.repository.project.DonationRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
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

    /**
     * [세은] Donation에 해당 데이터 존재 여부 확인
     * @param id
     */
    public void existsDonationById(Long id){
        if(!donationRepository.existsById(id)){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
    }

    /**
     * [세은] 고유 아이디로 엔티티 존재여부 반환
     * @param id
     * @return
     */
    public ProjectDonation findDonationById(Long id) {
        return donationRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }
}
