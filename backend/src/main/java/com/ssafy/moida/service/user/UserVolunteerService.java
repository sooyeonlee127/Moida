package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UpdateUserVolunteerStatusReqDto;
import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.api.response.GetUserVolunteerResDto;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.service.article.ArticleService;
import com.ssafy.moida.service.project.ProjectVolunteerService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import java.util.HashMap;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class UserVolunteerService {

    private final UsersVolunteerRepository usersVolunteerRepository;
    private final ProjectVolunteerService projectVolunteerService;
    private final ArticleService articleService;

    public UserVolunteerService(UsersVolunteerRepository usersVolunteerRepository, ProjectVolunteerService projectVolunteerService,
        ArticleService articleService) {
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.projectVolunteerService = projectVolunteerService;
        this.articleService = articleService;
    }

    /**
     * [한선영] 사용자가 참여한 봉사의 개수 가져오기
     * @return
     * */
    public long totalVolunteerCnt(Long userId) {
        // 봉사 프로젝트 개수 가져오기
        return usersVolunteerRepository.countByUsersId(userId);
    }

    /**
     * [한선영] 사용자가 참여한 봉사 프로젝트 목록(GetUserVolunteerResDto) 가져오기
     * [세은] articleId 추가
     * @param users
     * @param pageNumber
     * @param pageSize
     * @return
     */
    public List<GetUserVolunteerResDto> getUsersVolunteer(Users users, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        List<UsersVolunteer> list = usersVolunteerRepository.findByUsersOrderByRegDateDesc(users, pageable)
            .getContent();

        return list.stream()
            .map(uv -> uv.getStatus() == Status.WRITTEN? new GetUserVolunteerResDto(uv, articleService.findByUsersVolunteer(uv))
                : new GetUserVolunteerResDto(uv, null))
            .collect(Collectors.toList());
    }

    /**
     * [세은] 사용자 봉사 내역 갯수 조회
     * @param users
     * @return
     */
    public Long countGetUsersVolunteer(Users users){
        return usersVolunteerRepository.countUsersOrderByRegDateDesc(users.getId());
    }

    /**
     * [세은] UsersVolunteer 객체를 id로 찾기
     * @param id
     * @return
     */
    public UsersVolunteer findUsersVolunteerById(Long id){
        return usersVolunteerRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
    }

    /**
     * [세은] UsersVolunteer 객체가 존재하는지 확인
     * @param id
     * @return
     */
    public boolean existsById(Long id){
        return usersVolunteerRepository.existsById(id);
    }

    /**
     * [세은] UsersVolunteer에 사용자 봉사 신청 추가
     * @param users
     * @param volunteerDateInfo
     */
    @Transactional
    public void saveUsersVolunteer(Users users, VolunteerDateInfo volunteerDateInfo){
        UsersVolunteer usersVolunteer = UsersVolunteer.builder()
                .status(Status.REGISTER)
                .users(users)
                .volunteerDateInfo(volunteerDateInfo)
                .build();
        usersVolunteerRepository.save(usersVolunteer);
    }

    /**
     * [세은] 사용자 봉사 상태 변경
     * @param updateDto
     * @param usersVolunteer
     */
    @Transactional
    public void updateUserVolunteerStatus(UpdateUserVolunteerStatusReqDto updateDto, UsersVolunteer usersVolunteer){
        if(updateDto.getStatus().equals(Status.CANCEL.toString())){
            usersVolunteer.updateStatus(Status.CANCEL);
        } else if(updateDto.getStatus().equals(Status.WRITTEN_DELETE.toString())){
            usersVolunteer.updateStatus(Status.WRITTEN_DELETE);
        } else if(updateDto.getStatus().equals(Status.DONE.toString())){
            if(StringUtils.isBlank(updateDto.getCode())){
                throw new IllegalArgumentException("봉사 상태 완료 변경 시 인증 코드는 필수값입니다.");
            }

            VolunteerDateInfo volunteerDateInfo = projectVolunteerService.findVolunteerDateInfoById(usersVolunteer.getVolunteerDateInfo().getId());
            if(!volunteerDateInfo.getAuthenticationCode().equals(updateDto.getCode())){
                throw new CustomException(ErrorCode.INVALID_AUTH_CODE);
            }

            usersVolunteer.updateStatus(Status.DONE);
        }
    }

    /**
     * [한선영] 사용자가 작성한 봉사 인증글 목록(GetArticleDetailResDto) 가져오기
     * */
    public HashMap<String, Object> getUsersVolunteerArticle(Long userId, int pageNumber, int pageSize) {
        System.out.println(">>>>>hahahahh");
        List<GetArticleDetailResDto> results = articleService.findByUsersId(userId);

        System.out.println(">>>>>>>>>>");
        System.out.println(results);
        System.out.println(">>>>>>>>>>");

        int startIndex = pageSize * pageNumber;
        int endIndex = Math.min(startIndex + pageSize, results.size());

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("articleList", results.subList(startIndex, endIndex));
        resultMap.put("length", results.size());

        return resultMap;
    }
}
