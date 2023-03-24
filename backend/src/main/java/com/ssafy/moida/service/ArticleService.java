package com.ssafy.moida.service;

import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.model.article.Article;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.article.ArticleRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.utils.S3Uploader;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UsersVolunteerRepository usersVolunteerRepository;
    private final S3Uploader s3Uploader;

    public ArticleService(ArticleRepository articleRepository,
        UsersVolunteerRepository usersVolunteerRepository, S3Uploader s3Uploader) {
        this.articleRepository = articleRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.s3Uploader = s3Uploader;
    }

    @Transactional
    public void save(CreateArticleReqDto createArticleReqDto, MultipartFile file){
        UsersVolunteer usersVolunteer =
            usersVolunteerRepository.findById(createArticleReqDto.getUsersVolunteerProjectId())
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        String url = s3Uploader.uploadFileToS3(file, "static/article");

        Article article = Article.builder()
            .subject(createArticleReqDto.getSubject())
            .description(createArticleReqDto.getDescription())
            .difficultyLevel(createArticleReqDto.getDifficultyLevel())
            .category(createArticleReqDto.getCategory())
            .url(url)
            .usersVolunteer(usersVolunteer)
            .build();

        articleRepository.save(article);
    }

    @Transactional
    public void delete(Long articleId){
        articleRepository.deleteById(articleId);
    }

    public boolean existsById(Long articleId){
        return articleRepository.existsById(articleId);
    }
}
