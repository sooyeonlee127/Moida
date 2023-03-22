package com.ssafy.moida.blockchain.repository;

import com.ssafy.moida.blockchain.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface WalletRepository extends JpaRepository<Wallet,Long> {
}
