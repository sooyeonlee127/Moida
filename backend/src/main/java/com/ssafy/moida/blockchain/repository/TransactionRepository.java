package com.ssafy.moida.blockchain.repository;

import com.ssafy.moida.blockchain.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Long> {
}
