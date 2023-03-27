package com.ssafy.moida.service.user;

import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersDonation;
import com.ssafy.moida.repository.user.UsersDonationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.OptionalLong;

@Slf4j
@Service
@Transactional
public class UserDonationService {

    private final UsersDonationRepository usersDonationRepository;

    public UserDonationService(UsersDonationRepository usersDonationRepository) {
        this.usersDonationRepository = usersDonationRepository;
    }

    /**
     * [한선영] 사용자가 참여한 기부 프로젝트 목록(GetUserDonationResDto) 가져오기
     * @param userId
     * @return
     * */
    public List<GetUserDonationResDto> getUsersDonation(Long userId) {
        List<GetUserDonationResDto> result = new ArrayList<>();
        result = usersDonationRepository.findDonationsByUserId(userId);
        return result;
    }

    /**
     * [세은] 사용자가 기부할 경우, 포인트 차감 & 티켓 갯수 업데이트
     */
    @Transactional
    public void updateAfterDonation(Users users, Long point, int ticketCnt){
        users.updateDonation(users.getPoint() - point, users.getTicketCnt() + ticketCnt);
    }

    /**
     * [세은] 사용자가 기부할 경우 UsersDonation 제이터 저장
     */
    @Transactional
    public void saveUsersDonation(Long amount, int tickentCnt, int moi, Users users, Project project){
        UsersDonation usersDonation = UsersDonation.builder()
                .amount(amount)
                .ticketCnt(tickentCnt)
                .users(users)
                .moi(moi)
                .project(project)
                .build();
        usersDonationRepository.save(usersDonation);
    }

    /**
     * [한선영] 사용자가 기부를 한 적이 있는지 확인
     * @param userId
     * */
    public boolean existsUserDonation(Long userId) {
        boolean existDonation = usersDonationRepository.existsByUsersId(userId);
        return existDonation;
    }

    /**
     * [한선영] 기부에 사용한 총 포인트
     * @param userId
     * @return
     * */
    public long getTotalPoint(Long userId) {
        long totalPoint;

        if(existsUserDonation(userId)) { // 기부 한 적이 있을 때
            totalPoint = usersDonationRepository.findTotalPoint(userId);
        } else { // 기부를 한 적이 없을 때
            totalPoint = 0L;
        }

        return totalPoint;
    }

    /**
     * [한선영] 기부한 포인트를 곡물 가치로 변환
     * */
    public int convertPointToMoi(long userId, String category) {
        int moi;

        boolean exist = usersDonationRepository.existsByuserIdAndProjectCategory(userId, category);
        log.info("존재 여부 : {}", exist);

        if(exist) { // 해당 프로젝트에 기부를 한 적이 있으면
            moi = usersDonationRepository.findMoi(userId, category);
            log.info("모이 : {}", moi);
        } else { // 기부를 한 적이 없으면
            moi = 0;
        }

        return moi;
    }

}
