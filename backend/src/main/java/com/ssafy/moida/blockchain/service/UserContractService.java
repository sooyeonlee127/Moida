package com.ssafy.moida.blockchain.service;

import com.ssafy.moida.blockchain.model.wrapper.users.Users;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.utils.blockchain.BlockchainConnector;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

@Service
@Transactional
@Slf4j
public class UserContractService {
    private final BlockchainConnector connector;
    private Users userMgr;

    public UserContractService(BlockchainConnector connector) {
        this.connector = connector;
        this.userMgr = connector.getUserMgr();
    }

    public boolean registUser(String account, Role role) {
        try {
            TransactionReceipt receipt = userMgr.newMember(account, role.toString()).send();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
