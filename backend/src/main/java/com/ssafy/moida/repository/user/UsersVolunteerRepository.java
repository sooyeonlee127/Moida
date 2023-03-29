package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersVolunteerRepository extends JpaRepository<UsersVolunteer, Long>,
    PagingAndSortingRepository<UsersVolunteer, Long> {
    boolean existsByVolunteerDateInfoAndUsers(VolunteerDateInfo volunteerDateInfo, Users user);
    boolean existsById(UsersVolunteer usersVolunteer);
    Optional<UsersVolunteer> findById(Long id);
    Page<UsersVolunteer> findByUsersOrderByRegDateDesc(Users users, Pageable pageable);
    long countByUsersId(Long userId);
}
