package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 유저 엔티티
 */

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int ticket_cnt;

    @Column(nullable = false)
    private Long point;
    private String nft_url;
    private String wallet_url;

    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "users")
    private List<PointCharge> PointCharges = new ArrayList<>();

}
