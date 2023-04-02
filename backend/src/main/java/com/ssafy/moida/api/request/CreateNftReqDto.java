package com.ssafy.moida.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NFT 정보 저장 DTO
 * 사용자 아이디, 이미지 아이디, nft 이름, 메타데이터 주소, 이미지 주소
 * */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateNftReqDto {
    private long imgId;
    private String nftName;
    private String metadataUrl;
    private String imgUrl;

}
