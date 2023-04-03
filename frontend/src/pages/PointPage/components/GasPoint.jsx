import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import MetamaskCheck from "../../../components/MetamaskCheck";
const GasPoint = () => {
  // 수연: 블록체인 충전 거래 ---------------------------------------------
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);

  const {
    account, // DApp에 연결된 account address
  } = useWeb3React();

  const chargePoint = useCallback(async () => {
    const coinbase = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY;
    const Eth = web3.utils.toWei("0.01", "ether");

    // 이더 전송
    const gasLimit = 300000; // gas limit를 지정합니다.
    const chargeTx = {
      from: coinbase,
      to: account || localStorage.getItem("account"),
      value: Eth, // 원하는 이더 양
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
    };
    const signedTx = await web3.eth.accounts.signTransaction(
      chargeTx,
      process.env.REACT_APP_SEPOLIA_ADMIN_PRIVATE_KEY
    );
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    alert("충전이 완료되었습니다.");
    return "충전 완료 ^_^";
  });
  return (
    <Container>
      <MetamaskCheck />
      <Button
        onClick={(e) => {
          e.preventDefault();
          chargePoint();
        }}
      >
        충전하기
      </Button>
    </Container>
  );
};

const Button = styled.a`
  background-color: rgb(160, 200, 70);
  ${tw`
  rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
  `}
`;
const Container = styled.main`
  ${tw`
  grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8
  `}
`;
export default GasPoint;
