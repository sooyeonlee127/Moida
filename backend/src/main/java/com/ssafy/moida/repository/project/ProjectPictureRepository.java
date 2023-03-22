package com.ssafy.moida.repository.project;

import com.ssafy.moida.model.project.ProjectPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectPictureRepository extends JpaRepository<ProjectPicture, Long> {

}
