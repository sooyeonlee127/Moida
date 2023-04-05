package com.ssafy.moida.model.nft;

import com.ssafy.moida.model.user.Users;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * [NFT화 시킬 이미지 정보 엔티티]
 * PK : NFT 이미지 아이디
 * FK : NFT 아이디
 * 이미지 주소
 * */

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NftPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String url;

    @Builder
    public NftPicture(String url) {
        this.url = url;
    }
}
