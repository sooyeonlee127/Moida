import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import MetamaskCheck from "../../../components/MetamaskCheck";
import loadingspinner from "../../../assets/img/loadingspinner.svg";
const GasPoint = () => {
  const [flag, setFlag] = useState(false);
  const [done, setDone] = useState(false);

  // 수연: 블록체인 충전 거래
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);

  const {
    account, // DApp에 연결된 account address
  } = useWeb3React();

  const chargePoint = useCallback(async () => {
    setFlag(true);
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
    setDone(true);
    return "충전 완료 ^_^";
  });

  if (!flag) {
    return (
      <Container>
        <div>
          <ImageBox>
            <MetamaskCheck />
          </ImageBox>
          <Button
            onClick={(e) => {
              e.preventDefault();
              chargePoint();
            }}
          >
            충전하기
          </Button>
        </div>
      </Container>
    );
  } else if (!done && flag) {
    return (
      <Container>
        <div>
          <div>
            <Heading>거래를 진행중입니다.</Heading>
            <Text>잠시만 기다려주세요.</Text>
          </div>
          <ImageBox>
            <Image src={loadingspinner} alt="" width="200" />
          </ImageBox>
        </div>
      </Container>
    );
  } else if (done && flag) {
    return (
      <Container>
        <div>
          <Heading>거래가 완료되었습니다.</Heading>
        </div>
      </Container>
    );
  }
};

const Button = styled.a`
  background-color: rgb(160, 200, 70);
  ${tw`
  rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
  `}
`;
const Container = styled.main`
  background-color: #fafaf3;
  height: 84vh;
  width: 100vw;
  ${tw`
  grid min-h-full place-items-center px-6
  `}
`;

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

const Heading = styled.h3`
  ${tw`
  mb-1 text-2xl font-bold tracking-tight text-gray-900
  `}
`;

const Text = styled.p`
  ${tw`
  text-base leading-7 text-gray-600
  `}
`;

export default GasPoint;
