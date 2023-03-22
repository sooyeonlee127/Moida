package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * 봉사 레포지토리
 */
public interface VolunteerRepository extends JpaRepository<ProjectVolunteer, Long> {
}
