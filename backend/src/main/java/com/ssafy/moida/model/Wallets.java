package com.ssafy.moida.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Wallets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(nullable = false, length = 25)
    private BigDecimal balance;

    @Column(nullable = false)
    private int receivingCount;

    @Column(nullable = false, length = 10)
    private int cash;

    @OneToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
