package com.ssafy.moida.repository.project;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectPicture;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * [세은] 프로젝트 파일 레포지토리
 */
@Repository
public interface ProjectPictureRepository extends JpaRepository<ProjectPicture, Long> {
    List<ProjectPicture> findByProject(Project project);
}
