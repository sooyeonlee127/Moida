package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 유저 엔티티
 */

@Entity
@Getter
@Builder
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
    private int ticket_cnt;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private Long point;
    private String nft_url;
    private String wallet_url;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "users")
    private List<PointCharge> PointCharges = new ArrayList<>();

}
