import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
export const BlockContext = createContext();
const BlockChain = (props) => {
  const [acc, setAcc] = useState("");
  const [act, setAct] = useState("");
  const [coin, setCoin] = useState("")
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
    setAcc(account);
    return res;
  };

  useEffect(() => {
    if (!acc) {
      getAdminAddress().then((res) => {
        setAcc(account);
        setAct(active);
        setCoin(res)
      });
    }
  }, []);

  return (
    <BlockContext.Provider
      value={{
        acc,
        setAcc,
        act,
        setAct,
      }}
    >
      {props.children}
    </BlockContext.Provider>
  );
};
export default BlockChain;
