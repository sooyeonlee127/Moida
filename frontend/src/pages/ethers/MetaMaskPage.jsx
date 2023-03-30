import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Web3 from "web3";
function MetaMaskPage() {
  const web3 = new Web3(window.ethereum || "http://localhost:7545");
  const connectWallet = useCallback(async () => {
    try {
    // 메타마스크 설치 된 경우
      if(typeof window.ethereum !== 'undefined') {
      // todo
      const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
      
      
      // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask")
        window.open('https://metamask.io/download.html');
      }
    } catch (error) {
      console.log(error);
    }
  },[]);

  const chargePoint = useCallback(async () => {
    try {
    // 메타마스크 설치 된 경우
      if(typeof window.ethereum !== 'undefined') {
      // todo
      const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
      
      const coinBase = process.env.REACT_APP_ADMIN_WALLET_ADDRESS;
      
      const tx = await web3.eth.sendTransaction({
        from: coinBase,
        to: accounts[0],
        value: web3.utils.toWei("0.1", "ether"),
        data: "",
      });

      const txHash = web3.eth.sendTransaction(tx);
      console.log("tx : " + tx);
      console.log("txHash : " + txHash);
      // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask")
        window.open('https://metamask.io/download.html');
      }  
    } catch (error) {
      console.log(error);
    }
  },[]);

  const donatePoint = useCallback(async () => {
    try {
    // 메타마스크 설치 된 경우
      if(typeof window.ethereum !== 'undefined') {
      // todo
      
      // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask")
        window.open('https://metamask.io/download.html');
      }
    } catch (error) {
      console.log(error);
    }
  },[]);

  const clickHandler = async () => {
    const web3 = new Web3(window.ethereum || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts(); // 메타마스크에 선택된 지갑으로 트랜잭션 서명을 함
    console.log(accounts);

    const tx = await web3.eth.sendTransaction({
      from: accounts[0],
      to: "0x7536c087EB35E2771098c7a2ee10E7e52d3600C9",
      value: web3.utils.toWei("0.1", "ether"),
      data: "",
    });
    console.log(tx);
  };

  return (
    <div>
      <div className="Meta">
      <button onClick={chargePoint}>포인트 충전</button>
    </div>
    <div className="Meta">
      <button onClick={connectWallet}>연결확인</button>
    </div>
    <div className="Meta">
      <button onClick={clickHandler}>클릭</button>
    </div>
    
    </div>
  );
}

const Button = styled.button`
  margin: 300px;
  background: #00ffff;
  ${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
  &.disabled {
    opacity: 0.5;
  }
`;
export default MetaMaskPage;
