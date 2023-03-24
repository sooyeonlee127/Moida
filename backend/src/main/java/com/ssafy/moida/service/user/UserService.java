package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersDonation;
import com.ssafy.moida.repository.project.ProjectRepository;
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
import java.util.ArrayList;
import java.util.List;
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
    private final ProjectRepository projectRepository;
    private final UsersDonationRepository usersDonationRepository;
    private final UsersVolunteerRepository usersVolunteerRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, ProjectRepository projectRepository, UsersDonationRepository usersDonationRepository, UsersVolunteerRepository usersVolunteerRepository, EmailService emailService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.usersDonationRepository = usersDonationRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.emailService = emailService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * [한선영] 회원가입
     * 유저 role이 "ROLE_ADMIN"으로 들어 왔을 때만 관리자로 회원가입, 그 외에는 일반유저로 회원가입
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
     * [한선영] 유저가 참여한 봉사의 개수 가져오기
     * @return
     * */
    public long totalVolunteerCnt() {
        // 봉사 프로젝트 개수 가져오기
        return usersVolunteerRepository.countBy();
    }

    /**
     * [한선영] 유저가 참여한 기부 프로젝트 목록 가져오기
     *
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
    public void saveUsersDonation(Long amount, int tickentCnt, Users users, Project project){
        UsersDonation usersDonation = UsersDonation.builder()
            .amount(amount)
            .ticketCnt(tickentCnt)
            .users(users)
            .project(project)
            .build();
        usersDonationRepository.save(usersDonation);
    }
}
