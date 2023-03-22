package com.ssafy.moida.util.blockchain;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moida.api.common.blockchain.NewWalletDto;
import com.ssafy.moida.model.blockchain.Transaction;
import com.ssafy.moida.model.blockchain.wrapper.token.Token;
import com.ssafy.moida.model.blockchain.wrapper.users.Users;
import com.ssafy.moida.repository.blockchain.TransactionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.web3j.crypto.*;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class BlockchainConnector {
//    private final Web3j web3j;
//    private final TransactionRepository transactionRepository;
//
//    @Value("${eth.key.path}")
//    private String keyPath;
//
//    // Owner account
//    @Value("${eth.admin.wallet}")
//    private String adminWallet;
//
//    @Value("${eth.admin.password}")
//    private String adminPassword;
//
//    @Value("${eth.gas.limit}")
//    private String gasLimit;
//
//    @Value("${eth.gas.price}")
//    private String gasPrice;
//
//    @Value("${eth.contract.user}")
//    private String userAddr;
//
//    @Value("${eth.contract.token}")
//    private String tokenAddr;
//
//    @Value("${eth.chainId}")
//    private Long chainId;
//
//    private Users userMgr;
//    private Token tokenMgr;
//    private Credentials credentials;
//    private ContractGasProvider gasProvider;
//    private TransactionManager transactionManager;
//
//    private BigInteger decimals;
//
//    public BlockchainConnector(TransactionRepository transactionRepository) {
//        this.transactionRepository = transactionRepository;
//        this.web3j = Web3j.build(new HttpService("http:127.0.0.1:8545")); // 일단 하드햇 기본 네트워크
////        this.web3j = Web3j.build(new HttpService("http:j8c2071.p.ssafy.io:8545"));
//    }
//
//    @PostConstruct
//    public void init() {
//        this.gasProvider = new StaticGasProvider(
//                new BigInteger(gasPrice),
//                new BigInteger(gasLimit));
//
//        try {
//            File wallet = ResourceUtils.getFile(keyPath + adminWallet);
//            credentials = WalletUtils.loadCredentials(adminPassword, wallet);
//            transactionManager = new RawTransactionManager(web3j, credentials,
//                    chainId);
//            this.userMgr = Users.load(userAddr, web3j, transactionManager, gasProvider);
//            this.tokenMgr = Token.load(tokenAddr, web3j, transactionManager, gasProvider);
//            this.decimals = getDecimals();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (CipherException e) {
//            e.printStackTrace();
//        }
//    }
//
////    public Campaign deployCampaignContract(ContractRequestDto dto) throws Exception {
////
////        return Campaign.deploy(
////                web3j,
////                transactionManager,
////                gasProvider,
////                BalanceConverter.longToBigInteger(dto.getTargetAmount(), decimals),
////                BalanceConverter.longToBigInteger(dto.getDeadLine(), decimals),
////                memberAddr,
////                tokenAddr).send();
////    }
//
////    public Campaign loadContract(String address) {
////        return Campaign.load(address, web3j, transactionManager, gasProvider);
////    }
//
//    public Users getUserMgr() { return userMgr; }
//    public Token getTokenMgr() { return tokenMgr; }
//
//    public String getOwnerAccount() { return credentials.getAddress(); }
//
//    public BigInteger getDecimals() {
//        BigInteger retval = new BigInteger("18");
//        try {
//            retval = tokenMgr.decimals().send();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return retval;
//    }
//
//    public EthBlockNumber getBlockNumber() throws IOException {
//        return web3j.ethBlockNumber().send();
//    }
//
//    public NewWalletDto createAccount()
//            throws InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchProviderException, CipherException, IOException {
//
//        String password = createPassword();
//
//        ECKeyPair ecKeyPair = Keys.createEcKeyPair();
//
//        WalletFile walletFile = Wallet.createStandard(password, ecKeyPair);
//
//        String fileName = saveWalletFile(walletFile);
//
//        return new NewWalletDto(walletFile.getAddress(), fileName, password);
//    }
//
//    private String getWalletFileName(WalletFile walletFile) {
//        DateTimeFormatter format =
//                DateTimeFormatter.ofPattern("'UTC--'yyyy-MM-dd'T'HH-mm-ss.nVV'--'");
//        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
//
//        return now.format(format) + walletFile.getAddress() + ".json";
//    }
//
//    private String saveWalletFile(WalletFile walletFile) throws IOException {
//        String fileName = getWalletFileName(walletFile);
//        File file = new File(ResourceUtils.getFile(keyPath), fileName);
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.writeValue(file, walletFile);
//
//        return fileName;
//    }
//
//    private String createPassword() {
//        return UUID.randomUUID().toString().replaceAll("-", "");
//    }
//
//    private void subscribe() {
//        web3j.transactionFlowable().subscribe(tx -> transactionRepository.save(Transaction.from(tx)));
//    }
}
