package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UpdateUserVolunteerStatusReqDto;
import com.ssafy.moida.api.response.GetArticleDetailResDto;
import com.ssafy.moida.api.response.GetUserVolunteerResDto;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.article.ArticleRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.service.project.ProjectVolunteerService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class UserVolunteerService {

    private final UsersVolunteerRepository usersVolunteerRepository;
    private final ProjectVolunteerService projectVolunteerService;
    private final ArticleRepository articleRepository;

    public UserVolunteerService(UsersVolunteerRepository usersVolunteerRepository, ProjectVolunteerService projectVolunteerService, ArticleRepository articleRepository) {
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.projectVolunteerService = projectVolunteerService;
        this.articleRepository = articleRepository;
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
     * @param userId
     * @return
     * */
    public List<GetUserVolunteerResDto> getUsersVolunteer(Long userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        List<GetUserVolunteerResDto> result = usersVolunteerRepository.findVolunteersByUserId(userId, pageable);
        return result;
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
        // 봉사 취소인 경우
        if(updateDto.getStatus().equals(Status.CANCEL)){
            usersVolunteer.updateStatus(Status.CANCEL);
        } else if(updateDto.getStatus().equals(Status.DONE)){
            // 봉사 완료인 경우
            if(!StringUtils.isBlank(updateDto.getCode())){
                throw new IllegalArgumentException("봉사 상태 완료 변경 시 인증 코드는 필수값입니다.");
            }

            VolunteerDateInfo volunteerDateInfo = projectVolunteerService.findVolunteerDateInfoById(usersVolunteer.getVolunteerDateInfo().getId());
            if(volunteerDateInfo.getAuthenticationCode() != updateDto.getCode()){
                throw new CustomException(ErrorCode.INVALID_AUTH_CODE);
            }

            usersVolunteer.updateStatus(Status.DONE);
        }
    }

    /**
     * [한선영] 사용자가 작성한 봉사 인증글 목록(GetArticleDetailResDto) 가져오기
     * */
    public List<GetArticleDetailResDto> getUsersVolunteerArticle(Long userId) {
        List<GetArticleDetailResDto> result = new ArrayList<>();
        result = articleRepository.findByUsersId(userId);
        return result;
    }

}
