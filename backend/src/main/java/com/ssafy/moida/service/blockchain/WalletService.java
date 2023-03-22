package com.ssafy.moida.service.blockchain;

import com.ssafy.moida.model.blockchain.wrapper.token.Token;
import com.ssafy.moida.repository.blockchain.TransactionRepository;
import com.ssafy.moida.repository.blockchain.WalletRepository;
import com.ssafy.moida.util.blockchain.BlockchainConnector;
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
