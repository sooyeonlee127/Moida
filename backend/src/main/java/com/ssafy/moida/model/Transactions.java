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
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 256)
    private String hash;

    @Column(length = 100)
    private String nonce;

    @Column(length = 256)
    private String blockHash;

    @Column(length = 100)
    private String blockNumber;

    @Column(length = 100)
    private String transactionIndex;

    @Column(length = 256)
    private String fromHash;
    @Column(length = 256)
    private String toHash;

    @Column(length = 100)
    private String value;

    @Column(length = 100)
    private String gasPrice;

    @Column(length = 100)
    private String gas;

    @Column(length = 300)
    private String input;

    @Column(length = 256)
    private String creates;

    @Column(length = 256)
    private String publicKey;

    @Column(length = 256)
    private String raw;

    @Column(length = 256)
    private String r;

    @Column(length = 256)
    private String s;

    private String v;

    @CreatedDate
    private LocalDateTime storedAt;

}
