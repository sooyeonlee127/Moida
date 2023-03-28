package com.ssafy.moida.repository.article;

import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.model.article.Article;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>,
    PagingAndSortingRepository<Article, Long> {
    void deleteById(Long id);
    boolean existsById(Long id);
    Optional<Article> findById(Long id);
    @Query("SELECT COUNT(a) FROM Article a WHERE a.project.id = :projectId")
    Long countByProjectId(@Param("projectId") Long projectId);
    @Query("select new com.ssafy.moida.api.response.GetArticleDetailResDto(" +
            "a.id," +
            "a.difficultyLevel," +
            "a.subject," +
            "a.description," +
            "a.regDate," +
            "a.category," +
            "a.url)" +
            "from Article a " +
            "where a.usersVolunteer.users.id = :userId")
    List<GetArticleDetailResDto> findByUsersId(@Param("userId") Long userId);
    @Override
    @Query("SELECT a FROM Article a ORDER BY a.regDate DESC")
    Page<Article> findAll(Pageable pageable);
}
