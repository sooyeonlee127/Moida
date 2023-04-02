package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * NFT 정보를 주는 DTO
 * 이미지 파일 아이디, 이미지 파일, NFT 이름
 * */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetUserNftResDto {

    private Long nftId;
    private String metaDataUrl;
    private String imageUrl;
    private String name;

}
