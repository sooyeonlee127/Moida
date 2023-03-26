package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.ChangePwdReqDto;
import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.api.response.GetUserPointResDto;
import com.ssafy.moida.api.response.GetUserVolunteerResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.PointCharge;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersDonation;
import com.ssafy.moida.repository.user.PointChargeRepository;
import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.repository.user.UsersDonationRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.service.utils.EmailService;
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
    private final EmailService emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, UsersDonationRepository usersDonationRepository, UsersVolunteerRepository usersVolunteerRepository, PointChargeRepository pointChargeRepository, EmailService emailService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.usersDonationRepository = usersDonationRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.pointChargeRepository = pointChargeRepository;
        this.emailService = emailService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
            MimeMessage message = emailService.createMessage(email);
            code = emailService.sendMessage(message);
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
     * [한선영] 사용자가 참여한 봉사의 개수 가져오기
     * @return
     * */
    public long totalVolunteerCnt() {
        // 봉사 프로젝트 개수 가져오기
        return usersVolunteerRepository.countBy();
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
     * [한선영] 사용자가 참여한 봉사 프로젝트 목록(GetUserVolunteerResDto) 가져오기
     * @param userId
     * @return
     * */
    public List<GetUserVolunteerResDto> getUsersVolunteer(Long userId) {
        List<GetUserVolunteerResDto> result = new ArrayList<>();
        result = usersVolunteerRepository.findVolunteersByUserId(userId);

        return result;
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
    public void saveUsersDonation(Long amount, int tickentCnt, Users users, Project project){
        UsersDonation usersDonation = UsersDonation.builder()
            .amount(amount)
            .ticketCnt(tickentCnt)
            .users(users)
            .project(project)
            .build();
        usersDonationRepository.save(usersDonation);
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
            GetUserPointResDto dto = new GetUserPointResDto();

            dto.setPoints(donation.getAmount());
            dto.setCategory("donation");
            dto.setPointDate(donation.getRegDate());
            dto.setProjectSubject(donation.getProject().getSubject());
            dto.setGeneration(donation.getProject().getGeneration());
            dto.setTicketCnt(donation.getTicketCnt());

            result.add(dto);
        }

        // 충전 내역 저장
        for (PointCharge charge : pointCharges) {
            GetUserPointResDto dto = new GetUserPointResDto();

            dto.setPoints(charge.getAmount());
            dto.setCategory("charge");
            dto.setPointDate(charge.getRegDate());

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
                GetUserPointResDto dto = new GetUserPointResDto();

                dto.setPoints(charge.getAmount());
                dto.setCategory("charge");
                dto.setPointDate(charge.getRegDate());

                result.add(dto);
            }
        } else if(filter.equals("donation")) { // filter가 기부일때 포인트 내역
            List<UsersDonation> usersDonations = usersDonationRepository.findByUsersId(userId)
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

            for (UsersDonation donation : usersDonations) {
                GetUserPointResDto dto = new GetUserPointResDto();

                dto.setPoints(donation.getAmount());
                dto.setCategory("donation");
                dto.setPointDate(donation.getRegDate());
                dto.setProjectSubject(donation.getProject().getSubject());
                dto.setGeneration(donation.getProject().getGeneration());
                dto.setTicketCnt(donation.getTicketCnt());

                result.add(dto);
            }
        } else { // 나머지 경우에는 전체 포인트 내역
            return getUsersPoint(userId);
        }

        return result;
    }

    /**
     * [한선영] 기부에 사용한 총 포인트
     * */
    public long getTotalPoint(Long userId) {
        long totalPoint;

        OptionalLong optionalLong = usersDonationRepository.findTotalPoint(userId);
        if(optionalLong == null) {
            totalPoint = 0L;
        } else {
            totalPoint = optionalLong.getAsLong();
        }

        return totalPoint;
    }

}
