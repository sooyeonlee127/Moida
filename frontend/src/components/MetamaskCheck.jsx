import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState, useEffect, useContext } from "react";
import { injected } from "../lib/connectors";
import { BlockContext } from "../context/BlockChain";

const MetamaskCheck = () => {
  const [done, setDone] = useState(false);
  const { setAcc, setAct, setCoin } = useContext(BlockContext);

  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
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
    const res = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY;
    return res;
  };

  const connectWallet = useCallback(async () => {
    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        if (account) {
          localStorage.setItem("account", account);
          setAcc(account);
          setAct(active);
        }
        await activate(injected);
        setDone(true);
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getAdminAddress().then((res) => {
      connectWallet();
      setAcc(account);
      setAct(active);
    });
  }, []);

  if (!done) {
    return (
      <div>
        <p></p>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
};
export default MetamaskCheck;
