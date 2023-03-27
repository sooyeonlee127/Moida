//package com.ssafy.moida.model.user;
//
//import jakarta.persistence.*;
//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.CreatedDate;
//
//import java.time.LocalDateTime;
//
///**
// * [포인트 내역 엔티티]
// * PK : 포인트 내역 아이디
// * FK : 유저 기부, 포인트 충전
// * 포인트, 카테고리(기부,충전), 등록날짜, 프로젝트 제목, 프로젝트 차수, 티켓개수
// */
//
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class PointHistory {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private Long amount;
//
//    @Column(nullable = false)
//    private String category;
//
//    @CreatedDate
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime regDate;
//
//    @Column(length = 500)
//    private String projectSubject;
//
//    private int generation;
//
//    private int ticketCnt;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "point_charge_id")
//    private PointCharge pointCharge;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "users_donation_id")
//    private UsersDonation usersDonation;
//
//}
