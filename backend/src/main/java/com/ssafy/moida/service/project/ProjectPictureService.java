package com.ssafy.moida.service.project;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectPicture;
import com.ssafy.moida.repository.project.ProjectPictureRepository;
import com.ssafy.moida.utils.S3Uploader;
import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * 프로젝트 파일
 */
@Service
@Transactional(readOnly = true)
public class ProjectPictureService {
    private final ProjectPictureRepository projectPictureRepository;

    private final S3Uploader s3Uploader;

    public ProjectPictureService(ProjectPictureRepository projectPictureRepository,
        S3Uploader s3Uploader){
        this.projectPictureRepository = projectPictureRepository;
        this.s3Uploader = s3Uploader;
    }

    @Transactional
    public void save(List<MultipartFile> fileList, Project p) throws IOException {
        for (int i = 0; i < fileList.size(); i++) {
            String url = s3Uploader.uploadFiles(fileList.get(i), "static/project");

            ProjectPicture projectPicture = ProjectPicture.builder()
                .url(url)
                .project(p)
                .build();

            projectPictureRepository.save(projectPicture);
        }
    }
}
