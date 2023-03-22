package com.ssafy.moida.model.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 유저 엔티티
 */

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 50)
    private String phone;

    @Column(nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private int ticketCnt;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private Long point;

    //nft주소랑 지갑주소가 아직 알 수 없어서 잠시 null 처리함
    //@Column(nullable = false, length = 500)
    @Column(length = 500)
    private String nftUrl;
    //@Column(nullable = false, length = 500)
    @Column(length = 500)
    private String walletUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER; //ROLE_USER, ROLE_ADMIN

    public List<String> getRoleList() {
        if (this.role != null) {
            return Arrays.asList(this.role.toString());
        }
        return new ArrayList<>();
    }

    @Builder
    public Users(String email, String password, String phone, String nickname, int ticketCnt, Long point, String nftUrl, String walletUrl, Role role) {
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.nickname = nickname;
        this.ticketCnt = ticketCnt;
        this.point = point;
        this.nftUrl = nftUrl;
        this.walletUrl = walletUrl;
        this.role = role;
    }

    /*
     * [희주] 패스워크 인코더
     */
    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
