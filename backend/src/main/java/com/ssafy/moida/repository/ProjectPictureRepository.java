package com.ssafy.moida.repository;

import com.ssafy.moida.model.ProjectPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectPictureRepository extends JpaRepository<ProjectPicture, Long> {

}
