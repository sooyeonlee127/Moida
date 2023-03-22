package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 기부 레포지토리
 */
@Repository
public interface DonationRepository extends JpaRepository<ProjectDonation, Long> {

}
