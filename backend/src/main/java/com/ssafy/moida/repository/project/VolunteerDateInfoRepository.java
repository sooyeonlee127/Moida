package com.ssafy.moida.repository.project;

import com.ssafy.moida.model.project.VolunteerDateInfo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * [세은] 봉사 일시 레포지토리
 */
@Repository
public interface VolunteerDateInfoRepository extends JpaRepository<VolunteerDateInfo, Long> {
    Optional<VolunteerDateInfo> findById(Long id);
}
