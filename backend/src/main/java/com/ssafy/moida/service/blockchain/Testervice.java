package com.ssafy.moida.service.blockchain;

import com.ssafy.moida.model.Users;
import com.ssafy.moida.model.blockchain.Wallet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 블록체인 테스트 전용 서비스
 */

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TestService {
    private final PasswordEncoder passwordEncoder;
    private final WalletService walletService;
    Users saveOrUpdate(Users user) throws ChangeSetPersister.NotFoundException {
//        isValid(user); // user 유효성 검사
        Wallet wallet = walletService.createAccount(user)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        userContractService.registUser(wallet.getAddress());
        user.encodePassword(this.passwordEncoder);
    }
}
