package com.ssafy.moida.repository.article;

import com.ssafy.moida.model.article.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    boolean existsById(Long id);
    Optional<Board> findById(Long id);
    @Query("select b from Board b where b.project.id = :projectId")
    Optional<Board> getBoardByProject(@Param("projectId") Long projectId);
}
