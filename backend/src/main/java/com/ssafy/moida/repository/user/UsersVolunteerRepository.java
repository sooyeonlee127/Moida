package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.user.UsersVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersVolunteerRepository extends JpaRepository<UsersVolunteer, Long> {
    Long countBy();
}
