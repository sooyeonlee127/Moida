package com.ssafy.moida.model.blockchain;

import com.ssafy.moida.model.user.UsersDonation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 256, nullable = false)
    private String hash;
    @Column(length = 256, nullable = false)
    private String fromHash;
    @Column(length = 256, nullable = false)
    private String toHash;
    @Column(length = 100, nullable = false)
    private String nonce;
    @Column(nullable = false)
    private int gas;
    @Column(length = 100, nullable = false)
    private String gasPrice;
    @Column(length = 100, nullable = false)
    private String maxFeePerGas;
    @Column(length = 100, nullable = false)
    private String maxPriorityFeePerGas;
    @Column(length = 256, nullable = false)
    private String r;
    @Column(length = 256, nullable = false)
    private String s;
    @Column(length = 256, nullable = false)
    private String v;
    @Column(length = 100, nullable = false)
    private String value;
    @Column(length = 300, nullable = false)
    private String input;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime regTime;
}
