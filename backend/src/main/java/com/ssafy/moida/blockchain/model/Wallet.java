package com.ssafy.moida.blockchain.model;

import com.ssafy.moida.blockchain.dto.NewWalletDto;
import com.ssafy.moida.model.user.Users;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String address;

    private String keyFileName;

    @Column(length = 32)
    private String password;

    @Column(length = 40)
    private String account;

    @Column(nullable = false, length = 25)
    private BigInteger balance;

//    @Column(nullable = false)
//    private int receivingCount;

//    @Column(nullable = false, length = 10)
//    private int cash;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    public static Wallet of(Users user, NewWalletDto walletDto) {
        return Wallet.builder()
                .users(user)
                .account(walletDto.getAccount())
                .keyFileName(walletDto.getFileName())
                .password(walletDto.getPassword())
                .balance(BigInteger.ZERO)
                .build();
    }

    public void chargeBalance(BigInteger amount) {
        this.balance = balance.add(amount);
    }

    public void dischargeBalance(BigInteger amount) { this.balance = balance.subtract(amount);}

    public void setBalance(BigInteger amount) {this.balance = amount;}
}
