package com.ssafy.moida.model.blockchain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Transaction {
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
    private BigInteger blockNumber;

    @Column(length = 100)
    private BigInteger transactionIndex;

    @Column(length = 256)
    private String fromHash;
    @Column(length = 256)
    private String toHash;

    @Column(length = 100)
    private BigInteger value;

    @Column(length = 100)
    private BigInteger gasPrice;

    @Column(length = 100)
    private BigInteger gas;

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

    private long v;

//    private String type;
//    private String maxFeePerGas;
//    private String maxPriorityFeePerGas;


    @CreatedDate
    private LocalDateTime storedAt;

    public static Transaction from(org.web3j.protocol.core.methods.response.Transaction transaction) {
        return Transaction.builder()
                .hash(transaction.getHash())
                .transactionIndex(transaction.getTransactionIndex())
                .blockHash(transaction.getBlockHash())
                .blockNumber(transaction.getBlockNumber())
                .nonce(transaction.getNonceRaw())
                .fromHash(transaction.getFrom())
                .toHash(transaction.getTo())
                .value(transaction.getValue())
                .gasPrice(transaction.getGasPrice())
                .gas(transaction.getGas())
                .input(transaction.getInput())
                .creates(transaction.getCreates())
                .publicKey(transaction.getPublicKey())
                .raw(transaction.getRaw())
                .r(transaction.getR())
                .v(transaction.getV())
//                .type(transaction.getType())
//                .maxFeePerGas(transaction.getMaxFeePerGas())
//                .maxPriorityFeePerGas(transaction.getMaxPriorityFeePerGas())
                .build();
    }

}
