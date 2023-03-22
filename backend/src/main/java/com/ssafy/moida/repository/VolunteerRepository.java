package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 봉사 레포지토리
 */
@Repository
public interface VolunteerRepository extends JpaRepository<ProjectVolunteer, Long> {
}
