package com.ssafy.moida.repository.article;

import com.ssafy.moida.model.article.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    boolean existsById(Long id);
    Optional<Board> findById(Long id);
}
