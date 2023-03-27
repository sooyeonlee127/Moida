package com.ssafy.moida.service.project;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.ProjectPicture;
import com.ssafy.moida.repository.project.ProjectPictureRepository;
import com.ssafy.moida.utils.S3Uploader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    /**
     * [세은] 프로젝트 사진 테이블 저장
     * @param fileList, p
     * @throws IOException
     */
    @Transactional
    public void save(List<MultipartFile> fileList, Project p) throws IOException {
        for (int i = 0; i < fileList.size(); i++) {
            // S3 업로드 후 url 반환
            String url = s3Uploader.uploadFileToS3(fileList.get(i), "static/project");

            ProjectPicture projectPicture = ProjectPicture.builder()
                .url(url)
                .project(p)
                .build();

            projectPictureRepository.save(projectPicture);
        }
    }

    /**
     * [세은] 프로젝트에 따른 파일 조회
     * @param project
     * @return List<String> : 파일 url 리스트
     */
    public List<String> getFileList(Project project){
        List<ProjectPicture> fileList = projectPictureRepository.findByProject(project);
        List<String> results = new ArrayList<>();

        for (int i = 0, size = fileList.size(); i < size; i++) {
            results.add(fileList.get(i).getUrl());
        }

        return results;
    }
}
