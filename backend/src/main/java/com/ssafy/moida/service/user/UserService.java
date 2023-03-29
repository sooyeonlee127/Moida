package com.ssafy.moida.service.user;

import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.GetUserPointResDto;
import com.ssafy.moida.model.user.*;
import com.ssafy.moida.repository.project.VolunteerDateInfoRepository;
import com.ssafy.moida.repository.user.PointChargeRepository;
import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.repository.user.UsersDonationRepository;
import com.ssafy.moida.repository.user.UsersVolunteerRepository;
import com.ssafy.moida.utils.EmailUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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
    private final EmailUtils emailUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final VolunteerDateInfoRepository volunteerDateInfoRepository;

    public UserService(UserRepository userRepository, UsersDonationRepository usersDonationRepository, UsersVolunteerRepository usersVolunteerRepository, PointChargeRepository pointChargeRepository, EmailUtils emailUtils, BCryptPasswordEncoder bCryptPasswordEncoder, VolunteerDateInfoRepository volunteerDateInfoRepository) {
        this.userRepository = userRepository;
        this.usersDonationRepository = usersDonationRepository;
        this.usersVolunteerRepository = usersVolunteerRepository;
        this.pointChargeRepository = pointChargeRepository;
        this.emailUtils = emailUtils;
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
            MimeMessage message = emailUtils.createMessage(email);
            code = emailUtils.sendMessage(message);
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
     * [세은] 사용자 페이지 목록 페이지네이션
     * @return
     * */
    public List<GetUserPointResDto> getUsersPoint(Users user, int pageSize, int pageNumber) {
        List<GetUserPointResDto> results = getPointList(user);

        int startIndex = pageSize * pageNumber;
        int endIndex = Math.min(startIndex + pageSize, results.size());

        return results.subList(startIndex, endIndex);
    }

    /**
     * [한선영] 포인트 내역 전체 조회
     * @param user
     * @return
     */
    public List<GetUserPointResDto> getPointList(Users user) {
        List<UsersDonation> usersDonations = usersDonationRepository.findByUsersOrderByRegDate(user);
        List<PointCharge> pointCharges = pointChargeRepository.findByUsersOrderByRegDateDesc(user);

        List<GetUserPointResDto> result = Stream.concat(
                usersDonations.stream().map(donation -> new GetUserPointResDto(
                    donation.getAmount(),
                    "DONATION",
                    donation.getRegDate(),
                    donation.getProject().getSubject(),
                    donation.getProject().getGeneration(),
                    donation.getTicketCnt())),
                pointCharges.stream().map(charge -> new GetUserPointResDto(
                    charge.getAmount(),
                    "CHARGE",
                    charge.getRegDate())))
            .sorted(Comparator.comparing(GetUserPointResDto::getPointDate).reversed())
            .collect(Collectors.toList());

        return result;
    }

    /**
     * [한선영] 유저의 포인트 사용 목록 필터링해서 가져오기 - 수정필요
     * @param filter, userId
     * @return
     * */
    public List<GetUserPointResDto> getPointListFilter(String filter, Users user, int pageSize, int pageNumber) {
        List<GetUserPointResDto> results = new ArrayList<>();

        if(filter.equals("CHARGE")) { // filter가 충전일때 포인트 내역
            List<PointCharge> pointCharges = pointChargeRepository.findByUsersOrderByRegDateDesc(user);

            results = pointCharges.stream()
                .map(p -> new GetUserPointResDto(p.getAmount(), "CHARGE", p.getRegDate()))
                .sorted(Comparator.comparing(GetUserPointResDto::getPointDate).reversed())
                .collect(Collectors.toList());

        } else if(filter.equals("DONATION")) { // filter가 기부일때 포인트 내역
            List<UsersDonation> usersDonations = usersDonationRepository.findByUsersOrderByRegDate(user);

            results = usersDonations.stream()
                .map(ud -> new GetUserPointResDto(
                    ud.getAmount(),
                    "DONATION",
                    ud.getRegDate(),
                    ud.getProject().getSubject(),
                    ud.getProject().getGeneration(),
                    ud.getTicketCnt()
                )).sorted().collect(Collectors.toList());
        } else { // 나머지 경우에는 전체 포인트 내역
            return getPointList(user);
        }

        int startIndex = pageSize * pageNumber;
        int endIndex = Math.min(startIndex + pageSize, results.size());

        return results.subList(startIndex, endIndex);
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
