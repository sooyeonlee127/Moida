package com.ssafy.moida.repository.blockchain;

import com.ssafy.moida.model.blockchain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
