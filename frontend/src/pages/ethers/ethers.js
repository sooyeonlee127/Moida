const ethers = require("ethers");

const PRIVATE_NODE = "http://127.0.0.1:8545"; // 나중에 환경변수 처리 및 주소 변경

const provider = new ethers.providers.JsonRpcProvider();

// 코인베이스 주소 가져오기
// 0번째 account
const getAdminAddress = async () => {
    const signer = await provider.getSigner(); // index가 제공되지 않으면 0번째 account 반환
    const coinbase = await signer.getAddress();
    console.log("관리자 지갑 : " + coinbase);
    return coinbase;
};

// 지갑 만들기
const createAccount = async () => {
    const password = "123456"; // 지갑 임시 패스워드 -> 나중에는 회원가입할 때 받은 비밀번호면 좋겠음

    const coinbase = await getAdminAddress();
    const signer = ethers.Wallet.createRandom(); // 새 지갑 생성
    const keystore = await signer.encrypt(password); // 해당 지갑의 키스토어 파일

    console.log(keystore);

    // await coinbase.unlock("");

    // const Eth = web3.utils.toWei("10", "ether");
    const weiValue = 100000;
    const Eth = ethers.utils.formatEther(weiValue);

    // 트랜잭션 서명
    const signed = {
        to: coinbase,
        from: signer.address,
        value: Eth,
    };

    const wallet = signer.connect(provider);
    await wallet.sendTransaction(signed);

    // web3.eth.sendTransaction(tx).then((receipt) => receipt);
    // // ERC-20 토큰 보내기 전 허용
    // await TOKENContract.methods.approve(coinBase, 100).send({ from: coinBase });
    // // 허용 한 후 ERC-20 토큰 전송 ( 로그인 시 10 잉크 (10잉크 -> 1피드) )
    // await TOKENContract.methods.transferFrom(coinBase, wallet.address, 100).send({ from: coinBase });
    // return [wallet.address, wallet.privateKey];
};
createAccount();
