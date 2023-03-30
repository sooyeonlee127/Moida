import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState, useEffect } from "react";
import { injected } from "../../../lib/connectors";

const MetamaskCheck = () => {
  const web3 = new Web3();

  const [done, setDone] = useState(false);

  web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  const {
    connector,
    library,
    chainId, // DApp에 연결된 account의 chainId
    account, // DApp에 연결된 account address
    active, // DApp 유저가 로그인 된 상태인지 체크
    activate, // DApp 월렛 연결 기능 수행함수
    deactivate, // DApp 월렛 해제 수행함수
  } = useWeb3React();

  // 코인베이스 주소 가져오기
  const getAdminAddress = async () => {
    const res = await web3.eth.getCoinbase();
    return res;
  };

  const connectWallet = useCallback(async () => {
    console.log("connectWallet");

    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        // todorn;
        await activate(injected);
        console.log("coinbase : " + (await getAdminAddress()));
        console.log("address : " + account);
        setDone(true);
        localStorage.setItem("acc", account);
        // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    connectWallet();
  }, []);

  if (!done) {
    return (
      <div>
        <h1>메타 마스크 연결중입니다 .... </h1>
      </div>
    );
  } else {
    return (
      <div>
        <p>메타 마스크 연결 완료!</p>
        <p>회원가입을 계속 진행해주세요.</p>
        <p>{account}</p>
      </div>
    );
  }
};
export default MetamaskCheck;
