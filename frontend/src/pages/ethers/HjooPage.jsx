import styled from "styled-components";
import tw from "twin.macro";
import Web3 from "web3";
import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../lib/connectors";
import { TOKENContract } from "./SmartContract";

const HjooPage = () => {
    const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL)
    const {
        connector,
        library,
        chainId, // DApp에 연결된 account의 chainId
        account, // DApp에 연결된 account address
        active, // DApp 유저가 로그인 된 상태인지 체크
        activate, // DApp 월렛 연결 기능 수행함수
        deactivate // DApp 월렛 해제 수행함수
      } = useWeb3React();

    // 코인베이스 주소 가져오기
    const getAdminAddress = async () => {
        // const res = process.env.REACT_APP_ADMIN_PUBLIC_KEY // local
        const res = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY
        return res;
    };

    const connectWallet = useCallback(async () => {
        try {
          // 메타마스크 설치 된 경우
          if(typeof window.ethereum !== 'undefined') {
            await activate(injected);
            console.log("메타마스크 연결");    

          // 메타마스크 설치 안된 경우
          } else {
            alert("please install MetaMask")
            window.open('https://metamask.io/download.html');
          }
        } catch (error) {
          console.log(error);
        }
      });
    
    const unconnectWallet = async () => {
      try {
        // 메타마스크 설치 된 경우
        if(typeof window.ethereum !== 'undefined') {
          if(active) 
          {
            deactivate(injected)
            console.log("메타마스크 연결 해제");
          }

        // 메타마스크 설치 안된 경우
        } else {
          alert("please install MetaMask")
          window.open('https://metamask.io/download.html');
        }
      } catch (error) {
        console.log(error);
      }
    };

    // 발표 전에 Eth 크게 해줘야 함
    const chargePoint = useCallback(async () => {
      // await connectWallet();
      const coinbase = await getAdminAddress();
      console.log("chargePoint");
      
      // const web2 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
        // 현재 1ETH당 10000000000 설정 .. 0.000001 -> 10000Token
      
        /* 추후 value 가공
         * 1. value /= 10000000000;
         * 2. value.toString
         * "1" -> value
         */

        const Eth = web3.utils.toWei("0.01", "ether");

      // 이더 전송
      const gasLimit = 300000; // gas limit를 지정합니다.
      const chargeTx = {
        from: coinbase,
        to: account,
        value: Eth, // 원하는 이더 양
        gasLimit: web3.utils.toHex(gasLimit),
        // nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      }; 
      const signedTx = await web3.eth.accounts.signTransaction(chargeTx, process.env.REACT_APP_SEPOLIA_ADMIN_PRIVATE_KEY);
      // 개인 키로 서명된 트랜잭션을 전송
      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        return "충전 완료 ^_^";
      });
    
      // data 입력받기 : 닉네임, 기부액, 일시(이건 여기서?), 프로젝트 제목, 프로젝트 차수
      const donatePoint = useCallback(async () => {
        // await connectWallet();
        const coinbase = await getAdminAddress();
        console.log("donatePoint : " + account);

        const web3 = new Web3(window.ethereum);
        // 현재 1ETH당 10000000000 설정 .. 0.000001 -> 10000Token
      
        /* 추후 value 가공
         * 1. value /= 10000000000;
         * 2. value.toString
         * "1" -> value
         */
        let value = 10000;
        value = 10000/10000000000;
        const Eth = web3.utils.toWei("0.01", "ether");
        const tx = {
          from: account,
          to: coinbase, // 다른 지갑 하나 필요함
          value: Eth,
        }

        const result = await web3.eth.sendTransaction(tx);
        const transaction = await web3.eth.getTransaction(result.transactionHash);
        console.log(transaction.hash)
        return transaction; // chainId 안나옴
        // return await web3.eth.getTransaction(result.transactionHash);
      });

    return <>
    <Box></Box>
    <div>
    <div className="Meta">
      <button onClick={() => connectWallet()}>연결확인</button>
    </div>
    <div className="Meta">
      <button onClick={unconnectWallet}>연결해제</button>
    </div>
      <div className="Meta">
      <button onClick={chargePoint}>포인트 충전</button>
    </div>
    <div className="Meta">
      <button onClick={donatePoint}>기부</button>
    </div>
    </div>
    </>
}

export default HjooPage;

const Box = styled.div`
    ${tw`h-16`}
`