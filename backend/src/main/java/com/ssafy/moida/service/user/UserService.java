package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.api.response.GetUserPointResDto;
import com.ssafy.moida.api.response.GetUserVolunteerResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.*;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.repository.user.PointChargeRepository;
import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.repository.user.UsersDonationRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.utils.EamailUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * User에 관련된 각종 함수를 처리하는 서비스
 */

@Slf4j
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UsersDonationRepository usersDonationRepository;
    private final UsersVolunteerRepository usersVolunteerRepository;
    private final PointChargeRepository pointChargeRepository;
    private final EamailUtils eamailUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;

    public UserService(UserRepository userRepository, UsersDonationRepository usersDonationRepository, UsersVolunteerRepository usersVolunteerRepository, PointChargeRepository pointChargeRepository, EamailUtils eamailUtils, BCryptPasswordEncoder bCryptPasswordEncoder, VolunteerDateInfoRepository volunteerDateInfoRepository) {
        this.userRepository = userRepository;
        this.usersDonationRepository = usersDonationRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.pointChargeRepository = pointChargeRepository;
        this.eamailUtils = eamailUtils;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.volunteerDateInfoRepository = volunteerDateInfoRepository;
    }

    /**
     * [한선영] 회원가입
     * 사용자의 role이 "ROLE_ADMIN"으로 들어 왔을 때만 관리자로 회원가입, 그 외에는 일반유저로 회원가입
     * @param userJoinReqDto
     * */
    public void joinUser(UserJoinReqDto userJoinReqDto) {
        //user role 확인
        if(userJoinReqDto.getRole().equals(Role.valueOf("ROLE_ADMIN"))) {
            userJoinReqDto.setRole(Role.valueOf("ROLE_ADMIN"));
        } else {
            userJoinReqDto.setRole(Role.valueOf("ROLE_USER"));
        }

        Users u = Users.builder().email(userJoinReqDto.getEmail())
                .password(bCryptPasswordEncoder.encode(userJoinReqDto.getPassword()))
                .phone(userJoinReqDto.getPhone())
                .nickname(userJoinReqDto.getNickname())
                .ticketCnt(0)
                .point(0L)
                .nftUrl(userJoinReqDto.getNftUrl())
                .walletUrl(userJoinReqDto.getWalletUrl())
                .role(userJoinReqDto.getRole())
                .build();

        userRepository.save(u);
    }

    /**
     * [한선영] 닉네임 중복 검사
     * @param nickname
     * */
    public void duplicatedUserByNickname(String nickname) {
        // 닉네임이 존재하면 true, 아니라면 false
        boolean userNickname = userRepository.existsByNickname(nickname);

        // 닉네임이 존재한다면 중복이므로 에러 던지기
        if(userNickname) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

    }

    /**
     * [한선영] 이메일 중복 검사 및 인증 코드 발송
     * @param email
     * @return code
     * */
    public String duplicatedUserByEmail(String email) throws MessagingException, UnsupportedEncodingException {
        // 이메일이 존재하면 true, 아니라면 false
        boolean userEmail = userRepository.existsByEmail(email);

        String code = null;

        // 이메일이 존재한다면 중복이므로 에러 던지기
        if(userEmail) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        } else {
            // 중복이 아니라면 인증 번호 생성해서 이메일로 전송하기
            MimeMessage message = eamailUtils.createMessage(email);
            code = eamailUtils.sendMessage(message);
        }

        return code;
    }

    /**
     * [한선영] 비밀번호 정규 표현식 검사
     * @param password
     * */
    public void vaildUserByPassword(String password) {
        // 영문대소문자, 숫자, 특수문자 조합 8자이상 16자 이내
        Pattern pwdPattern = Pattern.compile("^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\\d~!@#$%^&*()_+=]{8,16}$");
        Matcher pwdMatcher = pwdPattern.matcher(password);

        /*
         * 비밀번호 정규 표현식을 검사 했을 때 조건에 맞다면 그냥 두기
         * 조건에 맞지 않다면 에러 던지기
         */
        if(!pwdMatcher.find()) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

    }

    /**
     * [세은] nickname으로 해당 user 찾기
     * @param nickname
     * @return
     */
    public Users findByNickname(String nickname){
        return userRepository.findByNickname(nickname).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    /**
     * [한선영] email로 해당 user 찾기
     * @param email
     * @return
     * */
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    /**
     * [한선영] 비밀번호 변경
     * @param email
     * @param password
     * */
    public void changePwd(String email, String password) {
        Users users = findByEmail(email);
        users.updatePassword(bCryptPasswordEncoder.encode(password));
    }

    /**
     * [한선영] 사용자가 포인트를 충전할 경우, 포인트 증가 업데이트
     * @param users, points
     * */
    @Transactional
    public void updateAfterPointCharge(Users users, Long amount) {
        users.updatePoint(users.getPoint() + amount);
    }

    /**
     * [한선영] 사용자가 포인트를 충전할 경우, PointCharge 데이터 저장
     * @param users, points
     * */
    @Transactional
    public void savePointCharge(Users users, Long amount) {
        PointCharge pointCharge = PointCharge.builder()
                .regDate(LocalDateTime.now())
                .amount(amount)
                .users(users)
                .build();
        pointChargeRepository.save(pointCharge);
    }

    /**
     * [한선영] 사용자의 포인트 사용 목록(GetUserPointResDto) 가져오기 - 수정필요
     * @param userId
     * @return
     * */
    public List<GetUserPointResDto> getUsersPoint(Long userId) {
        List<GetUserPointResDto> result = new ArrayList<>();

        //PointCharge랑 UsersDonation 정보 가져오기
        List<UsersDonation> usersDonations = usersDonationRepository.findByUsersId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<PointCharge> pointCharges = pointChargeRepository.findByUsersId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 기부 내역 저장
        for (UsersDonation donation : usersDonations) {
            GetUserPointResDto dto = new GetUserPointResDto(
                    donation.getAmount(),
                    "donation",
                    donation.getRegDate(),
                    donation.getProject().getSubject(),
                    donation.getProject().getGeneration(),
                    donation.getTicketCnt()
            );
            result.add(dto);
        }

        // 충전 내역 저장
        for (PointCharge charge : pointCharges) {
            GetUserPointResDto dto = new GetUserPointResDto(charge.getAmount(), "charge", charge.getRegDate());
            result.add(dto);
        }

        // 최신순으로 정렬
        Collections.sort(result, Comparator.comparing(GetUserPointResDto::getPointDate));

        return result;
    }

    /**
     * [한선영] 유저의 포인트 사용 목록 필터링해서 가져오기 - 수정필요
     * @param filter, userId
     * @return
     * */
    public List<GetUserPointResDto> getPointListFilter(String filter, Long userId) {
        List<GetUserPointResDto> result = new ArrayList<>();

        if(filter.equals("charge")) { // filter가 충전일때 포인트 내역
            List<PointCharge> pointCharges = pointChargeRepository.findByUsersId(userId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            for (PointCharge charge : pointCharges) {
                GetUserPointResDto dto = new GetUserPointResDto(charge.getAmount(), "charge", charge.getRegDate());
                result.add(dto);
            }
        } else if(filter.equals("donation")) { // filter가 기부일때 포인트 내역
            List<UsersDonation> usersDonations = usersDonationRepository.findByUsersId(userId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            for (UsersDonation donation : usersDonations) {
                GetUserPointResDto dto = new GetUserPointResDto(
                        donation.getAmount(),
                        "donation",
                        donation.getRegDate(),
                        donation.getProject().getSubject(),
                        donation.getProject().getGeneration(),
                        donation.getTicketCnt()
                );
                result.add(dto);
            }
        } else { // 나머지 경우에는 전체 포인트 내역
            return getUsersPoint(userId);
        }

        return result;
    }

    /**
     * [한선영] 현재 비밀번호와 입력 받은 비밀번호와 일치여부 확인
     * */
    public void checkCurrentPassword(Users user, String currentPassword) {
        if(!bCryptPasswordEncoder.matches(currentPassword, user.getPassword())) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }
    }

}
