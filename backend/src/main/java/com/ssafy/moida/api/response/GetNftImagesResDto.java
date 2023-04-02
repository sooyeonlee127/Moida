package com.ssafy.moida.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * NFT 이미지 정보를 주는 DTO
 * 이미지 파일 아이디, 이미지 파일, NFT 이름
 * */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetNftImagesResDto {

    private long ImgId;
    private String ImgFile;
    private String NtfName;

}
