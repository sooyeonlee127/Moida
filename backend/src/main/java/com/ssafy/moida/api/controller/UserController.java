package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.ChangePwdReqDto;
import com.ssafy.moida.api.request.UpdateUserVolunteerStatusReqDto;
import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.*;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
import com.ssafy.moida.service.user.UserDonationService;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.service.user.UserVolunteerService;
import com.ssafy.moida.utils.DtoValidationUtils;
import com.ssafy.moida.utils.EamailUtils;
import com.ssafy.moida.utils.TokenUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * 회원관리 관련 컨트롤러
 */
@Tag(name="회원관리")
@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserVolunteerService userVolunteerService;
    private final UserDonationService userDonationService;
    private final TokenUtils tokenUtils;
    private final DtoValidationUtils dtoValidationUtils;
    @Autowired
    private EamailUtils eamailUtils;

    public UserController(UserService userService, UserVolunteerService userVolunteerService, UserDonationService userDonationService, TokenUtils tokenUtils, DtoValidationUtils dtoValidationUtils) {
        this.userService = userService;
        this.userVolunteerService = userVolunteerService;
        this.userDonationService = userDonationService;
        this.tokenUtils = tokenUtils;
        this.dtoValidationUtils = dtoValidationUtils;
    }

    @Operation(summary = "회원가입", description = "회원 가입을 합니다.")
    @PostMapping(
            path = "/join",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> join(
            @RequestBody UserJoinReqDto userJoinReqDto
    ) {
        userService.vaildUserByPassword(userJoinReqDto.getPassword());  // 비밀번호 정규식 검사
        userService.joinUser(userJoinReqDto);                           // 회원 가입
        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }

    @Operation(summary = "닉네임 중복 검사", description = "사용자의 닉네임 중복 검사를 합니다.")
    @PostMapping(
            path = "/exists/nickname/{nickname}"
    )
    public ResponseEntity<?> checkUserNickname(
            @PathVariable(value = "nickname") String nickname
    ) {
        userService.duplicatedUserByNickname(nickname); // 닉네임 중복 검사
        return new ResponseEntity<>("닉네임 중복 없음", HttpStatus.OK);
    }

    @Operation(summary = "이메일 중복 검사 및 인증", description = "사용자가 입력한 이메일의 중복 검사를 합니다. 중복이 아니라면 이메일로 인증 코드를 발송합니다.")
    @PostMapping(
            path = "/exists/email/{email}"
    )
    public ResponseEntity<?> checkUserEmail(
            @PathVariable(value = "email") String email
    ) throws MessagingException, UnsupportedEncodingException {
        String code = userService.duplicatedUserByEmail(email); // 이메일 중복 검사 및 인증

        return new ResponseEntity<>(code, HttpStatus.OK);
    }

    @Operation(summary = "마이페이지", description = "마이페이지 내에 들어가는 로그인한 사용자의 정보를 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(
            path = "/me"
    )
    public ResponseEntity<UserInfoResDto> getUserDetail (
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        // 토큰 유효성 검증
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principal, false);

        // 유저가 참여한 봉사 개수 가져오기
        long totalVolunteerCnt = userVolunteerService.totalVolunteerCnt();
        log.info("volunteer Cnt : {}", totalVolunteerCnt);

        // 총 포인트 확인하기
        long totalPoint = userDonationService.getTotalPoint(loginUser.getId());
        log.info("total Point : {}", totalPoint);

        // 기부한 포인트를 곡물 가치로 변환하여 가져오기
        long userId = loginUser.getId();
        int moiAcorn = userDonationService.convertPointToMoi(userId, "SQUIRREL");
        int moiSeed = userDonationService.convertPointToMoi(userId, "CRANE");
        int moiCorn = userDonationService.convertPointToMoi(userId, "WILD_ANIMAL");

        // Dto에 유저 정보 저장
        UserInfoResDto userInfoResDto = UserInfoResDto.builder()
                .email(loginUser.getEmail())
                .nickname(loginUser.getNickname())
                .ticketCnt(loginUser.getTicketCnt())
                .point(loginUser.getPoint())
                .nftUrl(loginUser.getNftUrl())
                .volunteerCnt(totalVolunteerCnt)
                .totalPoint(totalPoint)
                .moiAcorn(moiAcorn)
                .moiSeed(moiSeed)
                .moiCorn(moiCorn)
                .build();

        return new ResponseEntity<>(userInfoResDto, HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 변경", description = "로그인한 사용자의 비밀번호를 변경합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping(
            path = "/me/password",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal PrincipalDetails principal,
            @RequestBody ChangePwdReqDto changePwdReqDto
    ) {
        // 로그인한 유저 정보 가져오기
        Users user = userService.findByEmail(principal.getUsername());

        // 로그인된 비밀번호와 입력한 현재 비밀번호가 맞는지 확인 -> 아니라면 에러 뱉기
        userService.checkCurrentPassword(user, changePwdReqDto.getCurrentPassword());

        // 새로 입력한 비밀번호 검증과 새 비밀번호로 변경
        userService.vaildUserByPassword(changePwdReqDto.getNewPassword());
        userService.changePwd(user.getEmail(), changePwdReqDto.getNewPassword());

        return new ResponseEntity<>("비밀번호 변경 성공", HttpStatus.OK);
    }

    /* [세은] 사용자 봉사 취소 */
    @Operation(summary = "사용자 봉사 상태를 변경합니다.", description = "사용자가 신청한 봉사를 취소 상태로 변경하거나 인증번호 일치 여부를 확인해 완료 상태로 변경합니다..")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping(path = "/me/volunteer")
    public ResponseEntity<?> updateUserVolunteerStatusToCancel(
            @RequestBody UpdateUserVolunteerStatusReqDto updateDto,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ){
        // 로그인한 사용자 토큰 검증
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);
        // DTO 값 겁증
        dtoValidationUtils.validateUpdateUserVolunteerStatusReqDto(updateDto);

        // 해당 봉사 아이디 존재 확인
        if(!userVolunteerService.existsById(updateDto.getVolunteerId())){
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        UsersVolunteer usersVolunteer = userVolunteerService.findUsersVolunteerById(updateDto.getVolunteerId());

        // 요구 봉사 아이디와 로그인 아이디 일치 여부 확인
        if(loginUser.getId() != usersVolunteer.getUsers().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN_USER);
        }

        // REGISTER 상태인 경우에만 CANCEL이나 DONE으로 변경이 가능함
        if(!usersVolunteer.getStatus().equals(Status.REGISTER)){
            throw new CustomException(ErrorCode.INVALID_DTO_STATUS);
        }

        // 상태 변경
        userVolunteerService.updateUserVolunteerStatus(updateDto, usersVolunteer);

        return new ResponseEntity<>("봉사 취소가 완료되었습니다", HttpStatus.OK);
    }


    @Operation(summary = "사용자 기부 내역", description = "로그인한 사용자의 기부 내역을 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(path = "/me/donation")
    public ResponseEntity<?> getUserDonationList(
        @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
        @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
        @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        // DTO 유효성 검사
        pageNumber -= 1;
        if(pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("요청 범위가 잘못되었습니다. 각 변수는 양수값만 가능합니다.");
        }

        List<GetUserDonationResDto> userDonationList = new ArrayList<>();
        userDonationList = userDonationService.getUsersDonation(userId, pageNumber, pageSize);

        return new ResponseEntity<>(userDonationList, HttpStatus.OK);
    }

    @Operation(summary = "사용자 봉사 내역", description = "로그인한 사용자의 봉사 내역을 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(path = "/me/volunteer")
    public ResponseEntity<?> getUserVolunteerList(
        @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
        @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
        @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        // DTO 유효성 검사
        pageNumber -= 1;
        if(pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("요청 범위가 잘못되었습니다. 각 변수는 양수값만 가능합니다.");
        }

        List<GetUserVolunteerResDto> userVolunteerList
            = userVolunteerService.getUsersVolunteer(userId, pageNumber, pageSize);

        return new ResponseEntity<>(userVolunteerList, HttpStatus.OK);
    }

    @Operation(summary = "사용자 포인트 내역", description = "로그인한 사용자의 포인트 사용 내역을 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(path = "/me/points")
    public ResponseEntity<?> getUserPointList(
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        List<GetUserPointResDto> userPointList = new ArrayList<>();
        userPointList = userService.getUsersPoint(userId);

        return new ResponseEntity<>(userPointList, HttpStatus.OK);
    }

    @Operation(summary = "사용자 포인트 충전", description = "사용자 포인트를 충전합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(
            path = "/me/points/charge"
    )
    public ResponseEntity<?> chargePoint(
            @AuthenticationPrincipal PrincipalDetails principal,
            @RequestParam(value = "point") Long point
    ) {
        if(point <= 0L || point >= Long.MAX_VALUE) {
            throw new CustomException(ErrorCode.INVALID_POINT);
        }

        Users user = userService.findByEmail(principal.getUsername());

        userService.updateAfterPointCharge(user, point);
        userService.savePointCharge(user, point);

        return new ResponseEntity<>("포인트 충전 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 포인트 내역 필터", description = "사용자의 포인트 사용 내역을 필터링하여 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(
            path = "/me/points/filters"
    )
    public ResponseEntity<?> pointFilter(
            @AuthenticationPrincipal PrincipalDetails principal,
            @RequestParam(value = "category") String category
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        List<GetUserPointResDto> userPointList = new ArrayList<>();
        userPointList = userService.getPointListFilter(category, userId);

        return new ResponseEntity<>(userPointList, HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 찾기", description = "가입된 이메일로 임시 비밀번호를 보냅니다.")
    @PostMapping(
            path = "/forgot-password/{email}"
    )
    public ResponseEntity<?> forgotPassword(
            @PathVariable(value = "email") String email
    ) throws MessagingException, UnsupportedEncodingException {
        // 사용자 존재 확인
        userService.findByEmail(email);

        // 임시 비밀번호가 담긴 메일 전송
        MimeMessage message = eamailUtils.createForgotPwdMessage(email);
        String tempPwd = eamailUtils.sendMessage(message);

        // 임시 비밀번호로 변경
        userService.changePwd(email, tempPwd);

        return new ResponseEntity<>("임시 비밀번호 발송 성공", HttpStatus.OK);
    }

    @Operation(summary = "사용자 봉사 인증글 내역", description = "로그인한 사용자의 봉사 인증글 목록을 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(
            path = "/me/volunteer-article"
    )
    public ResponseEntity<?> getUserVolunteerArticleList(
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        List<GetArticleDetailResDto> userVolunteerArticleList = new ArrayList<>();
        userVolunteerArticleList = userVolunteerService.getUsersVolunteerArticle(userId);

        return new ResponseEntity<>(userVolunteerArticleList, HttpStatus.OK);
    }

}
