import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../lib/connectors";

// 수연: 메타마스크 연결 해제 페이지
const MetamaskUncheck = () => {
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const {
    active, // DApp 유저가 로그인 된 상태인지 체크
    deactivate, // DApp 월렛 해제 수행함수
  } = useWeb3React();

  const unconnectWallet = async () => {
    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        if (active) {
          deactivate(injected);
          console.log("메타마스크 연결 해제");
        }
        // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    unconnectWallet();
  }, []);

  return <span></span>;
};
export default MetamaskUncheck;
