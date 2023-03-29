package com.ssafy.moida.repository.user;

import com.ssafy.moida.api.response.GetUserVolunteerResDto;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.UsersVolunteer;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersVolunteerRepository extends JpaRepository<UsersVolunteer, Long>,
    PagingAndSortingRepository<UsersVolunteer, Long> {
    boolean existsByVolunteerDateInfo(VolunteerDateInfo volunteerDateInfo);
    boolean existsById(UsersVolunteer usersVolunteer);
    Optional<UsersVolunteer> findById(Long id);

    @Query("select new com.ssafy.moida.api.response.GetUserVolunteerResDto(" +
            "uv.id," +
            "uv.volunteerDateInfo.project.id," +
            "uv.volunteerDateInfo.project.subject," +
            "uv.volunteerDateInfo.project.generation," +
            "uv.regDate," +
            "uv.status)" +
            "from UsersVolunteer uv " +
            "where uv.users.id = :userId")
    List<GetUserVolunteerResDto> findVolunteersByUserId(@Param("userId") Long userId, Pageable pageable);

    long countByUsersId(Long userId);
}
