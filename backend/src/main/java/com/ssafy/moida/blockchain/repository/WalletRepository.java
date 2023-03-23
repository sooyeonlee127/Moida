package com.ssafy.moida.blockchain.repository;

import com.ssafy.moida.blockchain.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface WalletRepository extends CrudRepository<Wallet,Long> {
}
