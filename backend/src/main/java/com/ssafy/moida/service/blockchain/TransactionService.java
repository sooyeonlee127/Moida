package com.ssafy.moida.service.blockchain;

import com.ssafy.moida.api.common.TransactionDto;
import com.ssafy.moida.model.blockchain.Transaction;
import com.ssafy.moida.model.user.UsersDonation;
import com.ssafy.moida.repository.blockchain.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public void save(TransactionDto transactionDto, UsersDonation usersDonation){
        Transaction transaction = Transaction.builder()
                .hash(transactionDto.getHash())
                .fromHash(transactionDto.getFromHash())
                .toHash(transactionDto.getToHash())
                .nonce(transactionDto.getNonce())
                .gas(transactionDto.getGas())
                .gasPrice(transactionDto.getGasPrice())
                .maxFeePerGas(transactionDto.getMaxFeePerGas())
                .maxPriorityFeePerGas(transactionDto.getMaxPriorityFeePerGas())
                .r(transactionDto.getR())
                .s(transactionDto.getS())
                .v(transactionDto.getV())
                .value(transactionDto.getValue())
                .input(transactionDto.getInput())
                .usersDonation(usersDonation)
                .build();

        transactionRepository.save(transaction);
    }
}
