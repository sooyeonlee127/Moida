package com.ssafy.moida.blockchain.service;

import com.ssafy.moida.blockchain.model.wrapper.token.Token;
import com.ssafy.moida.blockchain.repository.TransactionRepository;
import com.ssafy.moida.blockchain.repository.WalletRepository;
import com.ssafy.moida.utils.blockchain.BlockchainConnector;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
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
//        this.tokenMgr = connector.getTokenMgr();
//        this.decimals = connector.getDecimals();
    }
}
