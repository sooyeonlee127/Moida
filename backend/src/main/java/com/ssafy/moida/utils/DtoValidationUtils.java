package com.ssafy.moida.utils;

import com.ssafy.moida.api.common.ArticleSortDto;
import com.ssafy.moida.api.request.*;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class DtoValidationUtils {
    /**
     * [세은] ProjectReqDto NOT NULL 검증 함수
     * @param projectReqDto
     */
    public  void validateProjectReqDto(ProjectReqDto projectReqDto){
        checkStringType(projectReqDto.getSubject(), "프로젝트명");
        checkStringType(projectReqDto.getCategory(), "카테고리");
        validateCategory(projectReqDto.getCategory());
        checkStringType(projectReqDto.getDescription(), "상세 설명");
        checkLongType(projectReqDto.getPointPerMoi(), "곡물 가치");
    }

    /**
     * [세은] DonationReqDto NOT NULL 검증
     * @param donationReqDto
     */
    public void validateDonationReqDto(DonationReqDto donationReqDto){
        checkStringType(donationReqDto.getStartDate(), "봉사 일시");
        checkStringType(donationReqDto.getEndDate(), "봉사 일시");
        checkStringType(donationReqDto.getSubject(), "소제목");
        checkStringType(donationReqDto.getDescription(), "상세 설명");
        checkLongType(donationReqDto.getTargetAmount(), "목표 기부금");
    }

    /**
     * [세은] VolunteerReqDto NOT NULL 검증
     * @param volunteerReqDto
     */
    public void validateVolunteerReqDto(VolunteerReqDto volunteerReqDto){
        checkStringType(volunteerReqDto.getStartDate(), "봉사 일시");
        checkStringType(volunteerReqDto.getEndDate(), "봉사 일시");
        checkStringType(volunteerReqDto.getSubject(), "소제목");
        checkStringType(volunteerReqDto.getDescription(), "상세 설명");
        checkStringType(volunteerReqDto.getLocation(), "위치");
        checkIntType(volunteerReqDto.getCapacityPerDate(), "최대 봉사 인원수");
        if(volunteerReqDto.getDifficultyLevel() <= 0){
            throw new IllegalArgumentException("초기 봉사 난이도는 필수 입력값이며 양수 값만 가능합니다");
        }
    }

    /**
     * [세은] CreateArticleReqDto NOT NULL 검증
     * @param createArticleReqDto
     */
    public void validateCreateArticleReqDto(CreateArticleReqDto createArticleReqDto){
        checkStringType(createArticleReqDto.getSubject(), "제목");
        checkStringType(createArticleReqDto.getDescription(), "내용");
        checkStringType(createArticleReqDto.getCategory(), "카테고리");
        validateCategory(createArticleReqDto.getCategory());
        checkLongType(createArticleReqDto.getUsersVolunteerProjectId(), "사용자 봉사 아이디");
        if(createArticleReqDto.getDifficultyLevel() <= 0){
            throw new IllegalArgumentException("봉사 난이도는 필수 입력값이며 양수 값만 가능합니다");
        }
    }

    /**
     * [세은] createBoardReqDto NOT NULL 검증
     * @param createBoardReqDto
     */
    public void validateCreateBoardReqDto(CreateBoardReqDto createBoardReqDto){
        checkStringType(createBoardReqDto.getSubject(), "제목");
        checkStringType(createBoardReqDto.getDescription(), "내용");
        checkLongType(createBoardReqDto.getProjectId(), "프로젝트 아이디");
    }

    /**
     * [세은] 카테고리 INPUT 검증
     * @param category
     * @return
     */
    public void validateCategory(String category){
        if(!"CRANE".equals(category) && "SQUIRREL".equals(category) && "WILD_ANIMAL".equals(category)) {
            throw new CustomException(ErrorCode.CATEGORY_NOT_FOUND);
        }
    }

    /**
     * [세은] 상태 INPUT 검증
     * @param status
     */
    public void validateStatus(String status){
        if(!"DONE".equals(status) && !"REGISTER".equals(status) && !"CANCEL".equals(status)){
            throw new CustomException(ErrorCode.STATUS_NOT_FOUND);
        }

    }

    /**
     * [세은] 사용자 기부 신청 INPUT 검증
     * @param createDonationReqDto
     */
    public void validateCreateDonationReq(CreateDonationReqDto createDonationReqDto){
        checkLongType(createDonationReqDto.getProjectId(), "프로젝트 아이디");
        checkIntType(createDonationReqDto.getMoi(),"기부 모이");
    }

    /**
     * [세은] 인증글 전체 조회 필터 DTO 적용
     * @param articleSortDto
     */
    public void validateArticleSortDto(ArticleSortDto articleSortDto){
        if(articleSortDto.getPageNumber() < 0 || articleSortDto.getPageSize() <= 0) {
            throw new IllegalArgumentException("요청 범위가 잘못되었습니다. 각 변수는 양수값만 가능합니다.");
        }
        // 카테고리는 ALL, SQUIRREL, WILD_ANIMAL, CRANE
        validateCategory(articleSortDto.getCategory());
        if(!"ALL".equals(articleSortDto.getCategory())){
            throw new CustomException(ErrorCode.STATUS_NOT_FOUND);
        }

        // 정렬은 LATEST(최신순), DIFFICULTY_HIGHEST(난이도 높은순), DIFFICULTY_LOWEST(난이도 낮은순)
        if(!"LATEST".equals(articleSortDto.getSort()) && !"DIFFICULTY_HIGHEST".equals(articleSortDto.getSort())
        && !"DIFFICULTY_LOWEST".equals(articleSortDto.getSort())){
            throw new CustomException(ErrorCode.SORT_NOT_FOUND);
        }
    }

    /**
     * [세은] 사용자 봉사 상태 변경 시 NOT NULL 검증
     * @param updateUserVolunteerStatusReqDto
     */
    public void validateUpdateUserVolunteerStatusReqDto(UpdateUserVolunteerStatusReqDto updateUserVolunteerStatusReqDto){
        checkLongType(updateUserVolunteerStatusReqDto.getVolunteerId(), "아이디");
        checkStringType(updateUserVolunteerStatusReqDto.getStatus(), "변경할 상태");
        validateStatus(updateUserVolunteerStatusReqDto.getStatus());
    }

    /**
     * [세은] 프로젝트 생성 시 NOT NULL 검증
     * @param createProjectReqDto
     */
    public void validateCreateProjectReqDto(CreateProjectReqDto createProjectReqDto){
        validateProjectReqDto(createProjectReqDto.getProjectReqDto());
        validateDonationReqDto(createProjectReqDto.getDonationReqDto());
        validateVolunteerReqDto(createProjectReqDto.getVolunteerReqDto());
    }

    public void checkLongType(Long value, String name){
        if(value == null || value <= 0){
            throw new IllegalArgumentException(name + "은/는 필수 입력값이며 양수 값만 가능합니다.");
        }
    }

    public void checkIntType(int value, String name){
        if(value <= 0){
            throw new IllegalArgumentException(name + "은/는 필수 입력값이며 양수 값만 가능합니다.");
        }
    }

    public void checkStringType(String value, String name){
        if(StringUtils.isBlank(value)){
            throw new IllegalArgumentException(name + "은/는 필수 입력값입니다.");
        }
    }
}
