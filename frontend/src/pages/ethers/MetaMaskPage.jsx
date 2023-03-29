import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Web3 from "web3";

function MetaMaskPage() {
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
    <div className="Meta">
      <button onClick={clickHandler}>클릭</button>
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
