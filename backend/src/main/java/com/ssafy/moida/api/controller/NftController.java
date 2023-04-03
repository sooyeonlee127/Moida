package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateNftReqDto;
import com.ssafy.moida.api.response.GetNftImagesResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.nft.NftPicture;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.nft.NftService;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.TokenUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Tag(name="NFT")
@Slf4j
@RestController
@RequestMapping("/nft")
public class NftController {

    private final NftService nftService;
    private final UserService userService;
    private final TokenUtils tokenUtils;

    public NftController(NftService nftService, UserService userService, TokenUtils tokenUtils) {
        this.nftService = nftService;
        this.userService = userService;
        this.tokenUtils = tokenUtils;
    }

    @Operation(summary = "랜덤 이미지 가져오기", description = "DB에 저장된 이미지 중 랜덤으로 뽑아서 링크 형식을 이미지 형식으로 변환하여 전달한다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/image")
    public ResponseEntity<?> getRandomImages(
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) {
        // 유저 정보 가져오기
        log.info("랜덤이미지");
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);
        log.info("user : {}" , loginUser.getEmail());

        // 유저의 남은 티켓 개수 확인
        if(loginUser.getTicketCnt() <= 0) {
            throw new CustomException(ErrorCode.USER_TICKET_LACK);
        }

        // 랜덤으로 번호 하나를 뽑기
        int randomNum = nftService.getRandomNumber();

        // 뽑힌 번호에 해당하는 id를 가진 nft 이미지 링크가져오기
        NftPicture nftPicture = nftService.getRandomImageUrl();

        // 이미지 링크를 이미지 파일로 가져오기
        // File ImgFile = nftService.downloadImage(nftPicture.getUrl());

        // nft 이름 : 유저닉네임+현재날짜
        String nftName = loginUser.getNickname() + "_" + LocalDate.now();

        log.info("imgId : {}", nftPicture.getId());
        // nft 정보 저장
        GetNftImagesResDto getNftImagesResDto = new GetNftImagesResDto(nftPicture.getId(), nftPicture.getUrl(), nftName);

        return new ResponseEntity<>(getNftImagesResDto, HttpStatus.OK);
    }

    @Transactional
    @Operation(summary = "NFT 저장", description = "NFT를 저장합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping()
    public ResponseEntity<?> saveNFT(
            @RequestBody CreateNftReqDto createNftReqDto,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) {
        log.info("nft 저장");
        // DTO에 null 값이 있는지 체크

        // 유저 정보 가져오기
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);
        log.info("user 정보 : {}", loginUser);

        // 이미지 정보 가져오기
        NftPicture nftPicture = nftService.getNftImg(createNftReqDto.getImgId());

        // 티켓 차감
        userService.reduceTicket(loginUser);

        // NFT 저장
        nftService.saveNFT(createNftReqDto, nftPicture, loginUser);

        return new ResponseEntity<>("nft 저장 완료", HttpStatus.OK);
    }

}
