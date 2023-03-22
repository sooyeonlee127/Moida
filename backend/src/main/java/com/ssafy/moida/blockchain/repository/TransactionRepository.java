package com.ssafy.moida.blockchain.repository;

import com.ssafy.moida.blockchain.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
