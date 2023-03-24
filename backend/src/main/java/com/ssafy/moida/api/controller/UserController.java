package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.ChangePwdReqDto;
import com.ssafy.moida.api.request.UserJoinReqDto;
import com.ssafy.moida.api.response.GetUserDonationResDto;
import com.ssafy.moida.api.response.UserInfoResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
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

    public UserController(UserService userService) {
        this.userService = userService;
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

    @Operation(summary = "닉네임 중복 검사", description = "회원 닉네임 중복 검사를 합니다.")
    @PostMapping(
            path = "/exists/nickname/{nickname}"
    )
    public ResponseEntity<?> checkUserNickname(
            @PathVariable(value = "nickname") String nickname
    ) {
        userService.duplicatedUserByNickname(nickname); // 닉네임 중복 검사
        return new ResponseEntity<>("닉네임 중복 없음", HttpStatus.OK);
    }

    @Operation(summary = "이메일 중복 검사 및 인증", description = "회원이 입력한 이메일의 중복 검사를 합니다. 중복이 아니라면 이메일로 인증 코드를 발송합니다.")
    @PostMapping(
            path = "/exists/email/{email}"
    )
    public ResponseEntity<?> checkUserEmail(
            @PathVariable(value = "email") String email
    ) throws MessagingException, UnsupportedEncodingException {
        String code = userService.duplicatedUserByEmail(email); // 이메일 중복 검사 및 인증

        return new ResponseEntity<>(code, HttpStatus.OK);
    }

    @Operation(summary = "마이페이지", description = "마이페이지 내에 들어가는 로그인한 유저의 정보를 반환합니다.")
    @GetMapping(
            path = "/me"
    )
    public ResponseEntity<UserInfoResDto> getUserDetail (
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        // 로그인 된 유저 정보 가져오기
        Users user = userService.findByEmail(principal.getUsername());

        // 유저가 참여한 봉사 개수 가져오기
        long totalVolunteerCnt = userService.totalVolunteerCnt();
        log.info("volunteer Cnt : {}", totalVolunteerCnt);

        // 총 포인트 확인하기

        // Dto에 유저 정보 저장
        UserInfoResDto userInfoResDto = UserInfoResDto.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .ticketCnt(user.getTicketCnt())
                .point(user.getPoint())
                .nftUrl(user.getNftUrl())
                .volunteerCnt(totalVolunteerCnt)
                .totalPoint(0L)
                .build();

        return new ResponseEntity<>(userInfoResDto, HttpStatus.OK);
    }

    @Operation(summary = "내 기부 내역", description = "로그인한 유저의 기부 내역을 반환합니다.")
    @GetMapping(
            path = "/me/donation"
    )
    public ResponseEntity<?> getUserDonationList(
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Users user = userService.findByEmail(principal.getUsername());
        Long userId = user.getId();

        List<GetUserDonationResDto> userDonationList = new ArrayList<>();
        userDonationList = userService.getUsersDonation(userId);

        return new ResponseEntity<>(userDonationList, HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 변경", description = "로그인한 유저의 비밀번호를 변경합니다.")
    @PutMapping(
            path = "/me/password",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal PrincipalDetails principal,
            @RequestBody ChangePwdReqDto changePwdReqDto
    ) {

        Users user = userService.findByEmail(principal.getUsername());
        userService.vaildUserByPassword(changePwdReqDto.getPassword());
        userService.changePwd(user.getEmail(), changePwdReqDto);

        return new ResponseEntity<>("비밀번호 변경 성공", HttpStatus.OK);
    }

}
