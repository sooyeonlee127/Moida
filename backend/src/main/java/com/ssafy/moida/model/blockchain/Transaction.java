package com.ssafy.moida.model.blockchain;

import com.ssafy.moida.model.user.UsersDonation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_donation_id")
    private UsersDonation usersDonation;

    @Builder
    public Transaction(Long id, String hash, String fromHash, String toHash, String nonce, int gas, String gasPrice, String maxFeePerGas, String maxPriorityFeePerGas, String r, String s, String v, String value, String input, LocalDateTime regTime, UsersDonation usersDonation) {
        this.id = id;
        this.hash = hash;
        this.fromHash = fromHash;
        this.toHash = toHash;
        this.nonce = nonce;
        this.gas = gas;
        this.gasPrice = gasPrice;
        this.maxFeePerGas = maxFeePerGas;
        this.maxPriorityFeePerGas = maxPriorityFeePerGas;
        this.r = r;
        this.s = s;
        this.v = v;
        this.value = value;
        this.input = input;
        this.regTime = regTime;
        this.usersDonation = usersDonation;
    }
}
