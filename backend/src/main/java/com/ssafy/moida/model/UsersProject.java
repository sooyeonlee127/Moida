package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class UsersProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "reg_date",nullable = false, updatable = false)
    private LocalDateTime regDate;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private int ticket_cnt;

    @Column(nullable = false, length = 45)
    private String contractAddress;

    //관계 설정

}
