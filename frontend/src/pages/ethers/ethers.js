const ethers = require("ethers");
// const { TOKENContract, TOKEN_CA } = require("./SmartContract.js");

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

  console.log(password);
  const coinbase = await getAdminAddress();
  const signer = ethers.Wallet.createRandom(); // 새 지갑 생성
  const keystore = await signer.encrypt(password); // 해당 지갑의 키스토어 파일

  console.log("KeyStore : " + keystore);

  // await coinbase.unlock("");

  // const Eth = web3.utils.toWei("10", "ether");
  const weiValue = 10;
  const Eth = ethers.utils.formatEther(weiValue);

  console.log("signer address : " + signer.address);

  const wallet = signer.connect(provider);

  // await TOKENContract.methods.approve(coinbase, 100).send({ from: coinbase });
  await TOKENContract.approve(coinbase, 100);
  const result = await TOKENContract.transferFrom(
    coinbase,
    wallet.address,
    100
  );

  const bal = await TOKENContract.balanceOf(wallet.address);
  const total_bal = await TOKENContract.balanceOf(coinbase);

  console.log("코인 베이스 잔액 : " + total_bal);
  console.log("새 지갑 잔액 : " + bal);

  const signed = {
    to: coinbase,
    from: signer.address,
    value: ethers.utils.parseEther(Eth),
    gasLimit: 100,
  };

  await wallet.sendTransaction(signed);

  // return [wallet.address, wallet.privateKey];
  // await TOKENContract.transferFrom(coinbase, wallet.address, 100).send({
  //   from: coinbase,
  // });

  // // 트랜잭션 서명
  // const signed = {
  //   from: coinbase,
  //   to: signer.address,
  //   value: Eth,
  // };

  // await wallet.sendTransaction(signed);

  // return [wallet.address, wallet.privateKey];

  // web3.eth.sendTransaction(tx).then((receipt) => receipt);
  // // ERC-20 토큰 보내기 전 허용
  // await TOKENContract.methods.approve(coinBase, 100).send({ from: coinBase });
  // // 허용 한 후 ERC-20 토큰 전송 ( 로그인 시 10 잉크 (10잉크 -> 1피드) )
  // await TOKENContract.methods.transferFrom(coinBase, wallet.address, 100).send({ from: coinBase });
  // return [wallet.address, wallet.privateKey];
};
createAccount();

const TOKEN_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const TOKEN_CA = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // localhost
// const TOKEN_CA = "0x9D7AE7492d040c49a1A4E950d7086b9b1Dea5E44"; // sepolia
const TOKENContract = new ethers.Contract(
  TOKEN_CA,
  TOKEN_ABI,
  provider.getSigner()
);
