package com.ssafy.moida.repository.blockchain;

import com.ssafy.moida.model.blockchain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
}
