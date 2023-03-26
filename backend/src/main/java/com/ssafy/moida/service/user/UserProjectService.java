package com.ssafy.moida.service.user;

import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * [세은] UserService 충돌날까봐 임시로 작업해놓은 코드 저장소
 * Users + (Donation , Project) 테이블 연관된 코드만 작성해놓음
 */
@Service
public class UserProjectService {
    private final UsersVolunteerRepository usersVolunteerRepository;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;

    public UserProjectService(UsersVolunteerRepository usersVolunteerRepository, VolunteerDateInfoRepository volunteerDateInfoRepository) {
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.volunteerDateInfoRepository = volunteerDateInfoRepository;
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
     * [세은] 사용자 봉사 신청 취소
     * @param usersVolunteer
     * @param status
     */
    @Transactional
    public void updateUserVolunteerStatus(UsersVolunteer usersVolunteer, Status status){
        usersVolunteer.updateStatus(status);
    }
}
