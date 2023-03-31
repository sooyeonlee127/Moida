import styled from "styled-components";
import tw from "twin.macro";
import Web3 from "web3";
import { useState, useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../lib/connectors";
import { TOKENContract } from "./SmartContract";

const HjooPage = () => {
    // const web3 = new Web3(window.ethereum || "http://localhost:7545");
    // const web3 = new Web3();
    // web3.setProvider(
    //     new Web3.providers.HttpProvider(
    //       "http://127.0.0.1:7545"
    //     )
    //   );

    const web3 = new Web3(window.ethereum);
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
        // const res = await web3.eth.getCoinbase();
        const res = process.env.REACT_APP_ADMIN_WALLET_ADDRESS
        return res;
    };

    const connectWallet = useCallback(async () => {
        try {
        // 메타마스크 설치 된 경우
          if(typeof window.ethereum !== 'undefined') {
          // todo
          
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
      
      // 추후 value
      const chargePoint = useCallback(async () => {
        await connectWallet();
        const coinbase = await getAdminAddress();
        console.log("chargePoint");
        
        const web3 = new Web3("http://127.0.0.1:7545");
        // 현재 1ETH당 백만토큰 설정 .. 0.01 -> 10000Token
      
        /* 추후 value 가공
         * 1. value /= 1000000;
         * 2. value.toString
         * "1" -> value
         */
        const Eth = web3.utils.toWei("1", "ether");
        await web3.eth.personal.unlockAccount(
          coinbase,
          '',
          300
        );

      await TOKENContract.methods.approve(coinbase, Eth).send({ from: coinbase });

        const tx = {
          from: coinbase,
          to: account,
          value: Eth
        }
        
        console.log(await web3.eth.sendTransaction(tx));
      });
    
      // 추후 value
      const donatePoint = useCallback(async () => {
        await connectWallet();
        console.log("donatePoint : " + account);
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
        const coinbase = await getAdminAddress();
        // 현재 1ETH당 백만토큰 설정 .. 0.01 -> 10000Token
      
        /* 추후 value 가공
         * 1. value /= 1000000;
         * 2. value.toString]
         * "1" -> value
         */
        const Eth = web3.utils.toWei("1", "ether");
        const tx = {
          from: account,
          to: coinbase, // 다른 지갑 하나 필요함
          value: Eth
        }
        console.log(tx);
        web3.eth.sendTransaction(tx);
      });
    
        // 이건 무시하세요 !!!
      const clickHandler = async () => {
        console.log("clickHandler");
        const coinbase = await getAdminAddress();
        const web3 = new Web3(window.ethereum || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
        // console.log(accounts);
        const Eth = web3.utils.toWei("1", "ether"); // value를 ether로 
        const tx = await web3.eth.sendTransaction({
          from: account,
          to: "0x838DdA914FF4b0125cFfEBc11e027fEbc9B631C8",
          // value: web3.utils.toWei("0.1", "ether"),
          value: Eth
        });
        console.log(tx);
      };
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
    <div className="Meta">
      <button onClick={clickHandler}>클릭</button>
    </div>
    </div>
    </>
}

export default HjooPage;

const Box = styled.div`
    ${tw`h-16`}
`