package com.ssafy.moida.api.controller;

import com.ssafy.moida.api.request.CreateNftReqDto;
import com.ssafy.moida.api.response.GetNftImagesResDto;
import com.ssafy.moida.api.response.GetUserNftResDto;
import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.nft.NftPicture;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.nft.NftService;
import com.ssafy.moida.utils.TokenUtils;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
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
import java.util.List;
import java.util.Map;

@Tag(name="NFT")
@Slf4j
@RestController
@RequestMapping("/nft")
public class NftController {

    private final NftService nftService;
    private final TokenUtils tokenUtils;

    public NftController(NftService nftService, TokenUtils tokenUtils) {
        this.nftService = nftService;
        this.tokenUtils = tokenUtils;
    }

    @Operation(summary = "랜덤 이미지 가져오기", description = "DB에 저장된 이미지 중 랜덤으로 뽑아서 링크 형식을 이미지 형식으로 변환하여 전달한다.")
    @GetMapping("/image")
    public ResponseEntity<?> getRandomImages(
            @RequestParam(name = "userNickname") String userNickname
    ) {
        // 랜덤으로 번호 하나를 뽑기
        int randomNum = nftService.getRandomNumber();

        // 뽑힌 번호에 해당하는 id를 가진 nft 이미지 링크가져오기
        NftPicture nftPicture = nftService.getRandomImageUrl();

        // 이미지 링크를 이미지 파일로 가져오기
        // File ImgFile = nftService.downloadImage(nftPicture.getUrl());

        // nft 이름 : 유저닉네임+현재날짜
        String nftName = userNickname + "_" + LocalDate.now();

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

        // NFT 저장
        nftService.saveNFT(createNftReqDto, nftPicture, loginUser);

        return new ResponseEntity<>("nft 저장 완료", HttpStatus.OK);
    }

    @Operation(summary = "사용자 NFT 목록", description = "사용자의 NFT 목록을 가져옵니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/nftList")
    public ResponseEntity<?> getNftList(
            @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) {
        // 유저 정보 가져오기
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);
        Long userId = loginUser.getId();
        log.info("userId : {}", userId);

        // 페이지 검사
        pageNumber -= 1;
        if(pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("요청 범위가 잘못되었습니다. 각 변수는 양수값만 가능합니다.");
        }

        // 유저의 nft 목록 가져오기
        List<GetUserNftResDto> userNftList =
                nftService.getUserNft(userId, pageNumber, pageSize);
        Long length = nftService.countFindNftsByUserId(userId);

        return ResponseEntity.ok()
                .body(Map.of("nftList", userNftList, "length", length));
    }

    @Operation(summary = "사용자 대표 NFT 이미지 변경", description = "사용자의 대표 NFT 이미지를 변경합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/chageImg")
    public ResponseEntity<?> chageUserMainImg(
            @RequestParam(name = "nftId") long nftId,
            @AuthenticationPrincipal PrincipalDetails principalDetails
    ) {
        // 유저 정보 가져오기
        Users loginUser = tokenUtils.validateAdminTokenAndGetUser(principalDetails, false);
        Long userId = loginUser.getId();

        // 이미지 url 정보
        String imgUrl = loginUser.getNftUrl();

        // 사용자가 nftId에 해당하는 Nft를 가지고 있는지 확인
        if(nftService.existNft(userId, nftId)) {
            // NFT 이미지 변경
            imgUrl = nftService.chageMainNFT(loginUser, nftId);
        } else {
            // 소유하고 있지 않다면 에러
            throw new CustomException(ErrorCode.NFT_NOT_FOUND);
        }

        return new ResponseEntity<>("대표 NFT 변경 완료", HttpStatus.OK);
    }


}
