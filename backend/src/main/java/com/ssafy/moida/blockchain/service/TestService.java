package com.ssafy.moida.blockchain.service;

import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.blockchain.model.Wallet;
import com.ssafy.moida.repository.user.UserRepository;
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
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final WalletService walletService;
    private final UserContractService userContractService;

    public Users saveOrUpdateUser(Users user, Role role) throws ChangeSetPersister.NotFoundException {
//        isValid(user); // user 유효성 검사
        Wallet wallet = walletService.createAccount(user)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        userContractService.registUser(wallet.getAddress(), role);
        user.encodePassword(this.passwordEncoder);

        return this.userRepository.save(user);
    }
}
