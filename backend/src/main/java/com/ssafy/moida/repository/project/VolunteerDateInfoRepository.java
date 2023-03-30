package com.ssafy.moida.repository.project;

import com.ssafy.moida.api.response.GetVolunteerDateInfoResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * [세은] 봉사 일시 레포지토리
 */
@Repository
public interface VolunteerDateInfoRepository extends JpaRepository<VolunteerDateInfo, Long> {
    Optional<VolunteerDateInfo> findById(Long id);
    List<VolunteerDateInfo> findByProject(Project project);
    boolean existsById(Long id);

    @Query("SELECT new com.ssafy.moida.api.response.GetVolunteerDateInfoResDto("
                    + "vdi.id, "
                    + "vdi.volunteerDate, "
                    + "vdi.authenticationCode, "
                    + "vdi.capacity, "
                    + "vdi.maxCapacity, "
                    + "vdi.project.category, "
                     + "vdi.project.generation) "
                    + "FROM VolunteerDateInfo vdi "
                    + "ORDER BY vdi.volunteerDate ASC ")
    List<GetVolunteerDateInfoResDto> getVolunteerDateDetails();
}
