package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 * User 데이터베이스와 통신하는 클래스
 */
@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);

    Optional<Users> findByNickname(String username);
}
