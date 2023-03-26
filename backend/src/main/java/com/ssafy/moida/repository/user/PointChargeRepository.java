package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.user.PointCharge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PointChargeRepository extends JpaRepository<PointCharge, Long> {
    Optional<List<PointCharge>> findByUsersId(Long userId);
}
