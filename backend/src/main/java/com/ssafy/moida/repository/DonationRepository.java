package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectDonation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 기부 레포지토리
 */
public interface DonationRepository extends JpaRepository<ProjectDonation, Long> {

}
