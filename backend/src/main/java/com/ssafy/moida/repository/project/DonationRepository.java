package com.ssafy.moida.repository.project;

import com.ssafy.moida.model.project.ProjectDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * [세은] 기부 레포지토리
 */
@Repository
public interface DonationRepository extends JpaRepository<ProjectDonation, Long> {

}
