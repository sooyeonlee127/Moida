package com.ssafy.moida.model.user;

import com.ssafy.moida.model.project.Project;
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
public class UsersDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "reg_date",nullable = false, updatable = false)
    private LocalDateTime regDate;

    @Column(nullable = false)
    private Long amount;

    @Column(nullable = false)
    private int moi;

    @Column(nullable = false)
    private int ticketCnt;

    @Column(length = 45)
    private String contractAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

}
