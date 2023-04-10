package com.ssafy.moida.model.nft;

import com.ssafy.moida.model.user.Users;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * [NFT 정보 엔티티]
 * PK : NFT 아이디
 * FK : 사용자 아이디, NFT 이미지 아이디
 * 메타데이터 주소(IPFS), 이미지 주소(IPFS), NFT 이름, 등록날짜
 * */

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Nft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String metaDataUrl;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 500)
    private String name;

    @CreatedDate
    @Column(name = "reg_date",nullable = false, updatable = false)
    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_id")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="nft_picture_id")
    private NftPicture nftPicture;

    @Builder

    public Nft(Long id, String metaDataUrl, String imageUrl, String name, LocalDateTime regDate, Users users, NftPicture nftPicture) {
        this.id = id;
        this.metaDataUrl = metaDataUrl;
        this.imageUrl = imageUrl;
        this.name = name;
        this.regDate = regDate;
        this.users = users;
        this.nftPicture = nftPicture;
    }
}
