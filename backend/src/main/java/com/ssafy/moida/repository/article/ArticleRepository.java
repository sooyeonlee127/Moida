package com.ssafy.moida.repository.article;

import com.ssafy.moida.model.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    void deleteById(Long id);
    boolean existsById(Long id);
    Optional<Article> findById(Long id);
    @Query("SELECT COUNT(a) FROM Article a WHERE a.project.id = :projectId")
    Long countByProjectId(@Param("projectId") Long projectId);
}
