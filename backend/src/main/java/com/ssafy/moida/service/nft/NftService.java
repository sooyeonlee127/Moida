package com.ssafy.moida.service.nft;

import com.ssafy.moida.api.request.CreateNftReqDto;
import com.ssafy.moida.api.response.GetUserNftResDto;
import com.ssafy.moida.model.nft.Nft;
import com.ssafy.moida.model.nft.NftPicture;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.repository.nft.NftPictureRepository;
import com.ssafy.moida.repository.nft.NftRepository;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

/**
 * [한선영] nft 관련 서비스
 * */

@Slf4j
@Service
@Transactional
public class NftService {

    private final NftPictureRepository nftPictureRepository;
    private final NftRepository nftRepository;

    public NftService(NftPictureRepository nftPictureRepository, NftRepository nftRepository) {
        this.nftPictureRepository = nftPictureRepository;
        this.nftRepository = nftRepository;
    }

    // nft 이미지가 사용자가 소유한 nft와 중복인지 체크
    public boolean isImageDuplicate(int ImgNum, Long userId) {
        return nftRepository.existsByNftPictureId(ImgNum, userId);
    }

    // 랜덤으로 nft 번호 뽑기
    public int getRandomNumber() {
        int startNum = 1;
        int endNum = (int) nftPictureRepository.count(); // nftPicture entity의 총 개수

        int randomNum = new Random().nextInt(endNum - startNum + 1) + startNum;
        return randomNum;
    }

    // 랜덤 번호에 따른 이미지 제공
    public NftPicture getRandomImageUrl(Users user) {
        int startNum = 1;
        int endNum = (int) nftPictureRepository.count(); // nftPicture entity의 총 개수

        // 사용자가 모든 컬렉션을 모았는지 체크
        if(nftRepository.countByUsersId(user.getId()) >= endNum){
            throw new CustomException(ErrorCode.ALL_NFT_OWNERSHIP_ERROR);
        }

        int randomNum = new Random().nextInt(endNum - startNum + 1) + startNum;

        // 사용자가 소유하고 있는 nft인지 체크
        boolean nftCheck = isImageDuplicate(randomNum, user.getId());
        log.info("소유여부 : {}", nftCheck);

        NftPicture nftPicture = nftPictureRepository.findById((long) randomNum)
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        while (nftPicture.getUrl() == null || nftCheck) {
            randomNum = new Random().nextInt(endNum - startNum + 1) + startNum;
            nftCheck = isImageDuplicate(randomNum, user.getId());
            nftPicture = nftPictureRepository.findById((long) randomNum)
                    .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        }

        return nftPicture;
    }

    // 이미지 다운로드
    public File downloadImage(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            String contentType = connection.getContentType();
            if (contentType != null && contentType.startsWith("image")) {
                String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                InputStream inputStream = connection.getInputStream();
                File file = new File(fileName);
                FileOutputStream outputStream = new FileOutputStream(file);
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                outputStream.close();
                inputStream.close();
                return file;
            } else {
                throw new IOException("Invalid content type: " + contentType);
            }
        } else {
            throw new IOException("Failed to download image. Response code: " + responseCode);
        }
    }

    // nft 이미지 가져오기
    public NftPicture getNftImg(long id) {
        NftPicture nftPicture = nftPictureRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return nftPicture;
    }

    // nft 저장
    public void saveNFT(CreateNftReqDto createNftReqDto, NftPicture nftPicture, Users user) {
        Nft nft = Nft.builder()
                .metaDataUrl(createNftReqDto.getMetadataUrl())
                .imageUrl(createNftReqDto.getImgUrl())
                .name(createNftReqDto.getNftName())
                .regDate(LocalDateTime.now())
                .nftPicture(nftPicture)
                .users(user)
                .build();

        nftRepository.save(nft);
    }

    // 사용자 nft 목록 출력
    public List<GetUserNftResDto> getUserNft(Long userId, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<GetUserNftResDto> result = nftRepository.findNftsByUserId(userId, pageable);
        return result.getContent();
    }

    // 사용자가 보유한 nft 개수 반환
    public Long countFindNftsByUserId(Long userId) {
        return nftRepository.CountFindNftsByUserId(userId);
    }

    // 사용자가 해당 NFT를 가지고 있는지 체크
    public boolean existNft(Long userId, Long nftId) {
        return nftRepository.existsByIdAndUserId(userId, nftId);
    }

    // 대표 nft 변경
    public String chageMainNFT(Users user, Long nftId) {
        Nft nft = nftRepository.findById(nftId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        String newNftUrl = nft.getNftPicture().getUrl();

        user.updateNftUrl(newNftUrl);
        return newNftUrl;
    }

    // nft url 저장
    public void saveImg(String url) {
        NftPicture nftPicture = NftPicture.builder()
                .url(url)
                .build();

        nftPictureRepository.save(nftPicture);
    }

}
