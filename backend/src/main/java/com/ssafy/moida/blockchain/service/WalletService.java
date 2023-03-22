package com.ssafy.moida.blockchain.service;

import com.ssafy.moida.blockchain.dto.NewWalletDto;
import com.ssafy.moida.blockchain.model.Wallet;
import com.ssafy.moida.blockchain.model.wrapper.token.Token;
import com.ssafy.moida.blockchain.repository.TransactionRepository;
import com.ssafy.moida.blockchain.repository.WalletRepository;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.utils.blockchain.BlockchainConnector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class WalletService {
    private final BlockchainConnector connector;
    private final WalletRepository walletRepository;
    private  final TransactionRepository transactionRepository;

    private Token tokenMgr;

    private BigInteger decimals;

    public WalletService(BlockchainConnector connector, WalletRepository walletRepository, TransactionRepository transactionRepository) {
        this.connector = connector;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
        this.tokenMgr = connector.getTokenMgr();
        this.decimals = connector.getDecimals();
    }

    public Optional<Wallet> createAccount(Users user) {
        try {
            NewWalletDto newWalletDto = connector.createAccount();
            Wallet wallet = Wallet.of(user, newWalletDto);
            return Optional.ofNullable(wallet);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.ofNullable(null);
    }
}
