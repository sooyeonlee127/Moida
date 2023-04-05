import styled from "styled-components";
import tw from "twin.macro";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState, useEffect } from "react";
import { injected } from "../lib/connectors";
import loadingspinner from "../assets/img/loadingspinner.svg";
import { useNavigate } from "react-router-dom";

const MetamaskCheck = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
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
    console.log("MetamaskCheck connectWallet");
    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        await activate(injected);
        if (account) {
          localStorage.setItem("account", account);
        }
        await activate(injected);
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      // 연결 실패시 여기로 와야함.
      setError(true);
      console.log(error);
    }
  });

  useEffect(() => {
    if (library) {
      setDone(true);
    } else {
      connectWallet();
    }
  }, [library]);

  if (error) {
    return (
      <Container>
        <InnerContainer>
          <p>메타마스크 연결에 실패했습니다.</p>
          <p>블록체인 기반 안전한 거래를 위해 메타마스크를 연결해주세요.</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setError(false);
              setDone(false);
              connectWallet();
            }}
          >
            재시도하기
          </button>
        </InnerContainer>
      </Container>
    );
  } else if (!done) {
    return (
      <Container>
        <InnerContainer>
          <p>메타마스크 연결 중입니다..</p>
          <p>블록체인 기반 안전한 거래를 위해 메타마스크를 연결해주세요.</p>
          <div>
            <ImageBox>
              <Image src={loadingspinner} alt="" width="200" />
            </ImageBox>
          </div>
        </InnerContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <InnerContainer>
          <p>메타마스크 연결이 완료되었습니다.</p>
          <p>시도하던 동작을 계속해주세요.</p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            원래 페이지로 이동
          </Button>
        </InnerContainer>
      </Container>
    );
  }
};

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

const InnerContainer = styled.div`
  ${tw`
  px-10 py-7 w-full max-w-md space-y-9
  `}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fafaf3;
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4
  `}
`;

const Button = styled.button`
  background-color: rgb(160, 200, 70);
  color: rgb(75, 75, 75);
  ${tw`
  w-full h-full py-3 px-10 font-semibold 
  `}
`;

export default MetamaskCheck;
