package com.ssafy.moida.repository.user;

import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.model.user.UsersDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.OptionalLong;

public interface UsersDonationRepository extends JpaRepository<UsersDonation, Long> {
    @Query("SELECT new com.ssafy.moida.api.response.GetUserDonationResDto("
            + "ud.project.id, "
            + "ud.project.subject, "
            + "ud.project.generation, "
            + "ud.regDate, "
            + "CAST(ud.amount / ud.project.pointPerMoi AS LONG), "
            + "ud.ticketCnt) "
            + "FROM UsersDonation ud "
            + "WHERE ud.users.id = :userId ")
    List<GetUserDonationResDto> findDonationsByUserId(@Param("userId") Long userId);

    Optional<List<UsersDonation>> findByUsersId(Long userId);

    @Query("select sum(ud.amount) from UsersDonation ud where ud.users.id = :userId")
    Long findTotalPoint(@Param("userId") Long userId);

    boolean existsByUsersId(Long userId);
}
