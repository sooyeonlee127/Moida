package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectDonation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepository extends JpaRepository<ProjectDonation, Long> {

}
