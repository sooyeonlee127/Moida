package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<ProjectVolunteer, Long> {
}
