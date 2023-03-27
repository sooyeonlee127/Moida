package com.ssafy.moida.service.article;

import com.ssafy.moida.api.request.CreateArticleReqDto;
import com.ssafy.moida.api.request.UpdateArticleReqDto;
import com.ssafy.moida.api.request.UpdateBoardReqDto;
import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.api.response.GetArticleResDto;
import com.ssafy.moida.model.article.Article;
import com.ssafy.moida.model.article.Board;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.article.ArticleRepository;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.utils.S3Uploader;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final S3Uploader s3Uploader;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;

    public ArticleService(ArticleRepository articleRepository,S3Uploader s3Uploader,
        VolunteerDateInfoRepository volunteerDateInfoRepository) {
        this.articleRepository = articleRepository;
        this.s3Uploader = s3Uploader;
        this.volunteerDateInfoRepository = volunteerDateInfoRepository;
    }

    /**
     * [세은] Article에 사용자 봉사 인증 게시물 데이터 추가 및 Project DifficultyLevel 업데이트
     * @param createArticleReqDto
     * @param usersVolunteer
     * @param file
     */
    @Transactional
    public void save(CreateArticleReqDto createArticleReqDto,
                     UsersVolunteer usersVolunteer, MultipartFile file){
        // 사진 S3 업로드
        String url = "";
        if(file != null)  url = s3Uploader.uploadFileToS3(file, "static/article");

        /*
         * Project DifficultyLevel 업데이트
         * DifficultyLevel = 기존의 difficultyLevel + 새로운 difficultyLevel / 전체 difficultyLevel 갯수
         */
        Project project = volunteerDateInfoRepository
                .findById(usersVolunteer.getVolunteerDateInfo().getId()).get().getProject();

        Users users = usersVolunteer.getUsers();

        Article article = Article.builder()
            .subject(createArticleReqDto.getSubject())
            .description(createArticleReqDto.getDescription())
            .difficultyLevel(createArticleReqDto.getDifficultyLevel())
            .category(createArticleReqDto.getCategory())
            .url(url)
            .usersVolunteer(usersVolunteer)
            .project(project)
            .users(users)
            .build();

        articleRepository.save(article);

        Long projectArticleCount = articleRepository.countByProjectId(project.getId());
        Double difficultyLevel = (project.getProjectVolunteer().getDifficultyLevel() + createArticleReqDto.getDifficultyLevel()) / (projectArticleCount + 1);

        project.getProjectVolunteer().updateDifficulty(difficultyLevel);
        users.updateTicket(users.getTicketCnt() + 2);
    }

    /**
     * [세은] 고유 아이디로 엔티티 조회
     * @param articleId
     * @return
     */
    public Article findById(Long articleId){
        return articleRepository.findById(articleId)
            .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }

    /**
     * [세은] 사용자 게시글 상세조회
     * @param articleId
     * @return
     */
    public GetArticleDetailResDto getArticleDetailById(Long articleId){
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return new GetArticleDetailResDto(article);
    }

    /**
     * [세은] 사용자 인증게시물 삭제
     * @param articleId
     */
    @Transactional
    public void delete(Long articleId){
        articleRepository.deleteById(articleId);
    }

    /**
     * [세은] 사용자 인증게시물 존재여부 확인
     * @param articleId
     * @return
     */
    public boolean existsById(Long articleId){
        return articleRepository.existsById(articleId);
    }

    /**
     * [세은] 사용자 인증글 전체 가져오기(인증갤러리 조회용)
     * @return
     */
    public List<GetArticleResDto> getArticleList(){
        List<Article> articleList = articleRepository.findAll();
        List<GetArticleResDto> results = new ArrayList<>();

        for (int i = 0; i < articleList.size(); i++) {
            Article a = articleList.get(i);
            results.add(new GetArticleResDto(a.getId(), a.getSubject(), a.getUrl(), a.getDifficultyLevel()));
        }

        return results;
    }

    /**
     * [세은] 인증글 수정
     * @param updateArticleReqDto
     */
    @Transactional
    public void updateArticle(UpdateArticleReqDto updateArticleReqDto){
        Article article = findById(updateArticleReqDto.getId());
        article.updateArticle(updateArticleReqDto.getSubject(), updateArticleReqDto.getDescription());
    }
}
