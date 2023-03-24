package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.UsersVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersVolunteerRepository extends JpaRepository<UsersVolunteer, Long> {
    Long countBy();
    boolean existsByVolunteerDateInfo(VolunteerDateInfo volunteerDateInfo);
}
