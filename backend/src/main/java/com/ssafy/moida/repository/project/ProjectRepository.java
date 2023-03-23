package com.ssafy.moida.repository.project;

import com.ssafy.moida.model.project.Category;
import com.ssafy.moida.model.project.Project;
import java.awt.print.Pageable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * [세은] 프로젝트 레포지토리
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // 프로젝트 전체 조회
    List<Project> findAll();

    // 프로젝트 상세 조회
    Project findById(long id);

    // 해당 카테고리에 해당하는 프로젝트의 가장 최신 차순 출력
    @Query("SELECT p FROM Project p WHERE p.category = :category ORDER BY p.generation DESC")
    List<Project> findNewestGenerationByCategory(@Param("category") String category);

    @Query("select p from Project p where p.generation = (select max(p2.generation) from Project p2 where p2.category = p.category)")
    List<Project> findNewestProjectByCategory();
}
