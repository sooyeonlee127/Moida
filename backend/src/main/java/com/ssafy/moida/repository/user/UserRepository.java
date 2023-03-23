package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * User 데이터베이스와 통신하는 클래스
 */
public interface UserRepository extends JpaRepository<Users, Long> {

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);

    Optional<Users> findByUsername(String username);
}
