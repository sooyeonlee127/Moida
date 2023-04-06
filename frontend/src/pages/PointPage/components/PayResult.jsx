import React from "react";
import axios from "axios";
import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState, useCallback, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/auth";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import loadingspinner from "../../../assets/img/loadingspinner.svg";
import { AuthContext } from "../../../context/Auth";

// 수연: 결제 결과 페이지
const PayResult = () => {
  const navigate = useNavigate();
  // 수연: param에서 pg_token 가져와서 카카오페이 결제 호출
  const [searchParams, setSearchParams] = useSearchParams(); // 에러 아님
  const queryString = searchParams.get("pg_token");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [flag, setFlag] = useState(true);
  const [done, setDone] = useState(false);
  const { change, setChange } = useContext(AuthContext);


  // 수연: 현재 페이지를 호출한 페이지를 제어
  const parentPage = (page) => {
    if (page) {
      try {
        window.opener.parentCallback(page);
        navigate(`${page}`, { replace: true });
      } catch (error) {
        navigate(`${page}`, { replace: true });
      }
    } else {
      try {
        window.opener.parentCallback(page);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 수연: refetch 위해서 useQuery 가져옴.
  const getMe = async () => {
    try {
      const response = await api({
        url: "/users/me",
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    refetchOnMount: true,
  });

  // 수연: 포인트 충전 api 호출
  const ChargePoint = (amount) => {
    api({
      url: "/users/me/points/charge",
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
      params: {
        point: amount,
      },
    })
      .then((res) => {
        ChargeGasPoint();
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 수연: 가스 충전
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const {
    account, // DApp에 연결된 account address
    connector,
    activate,
  } = useWeb3React();

  const ChargeGasPoint = useCallback(async () => {
    setFlag(true);
    const coinbase = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY;
    const Eth = web3.utils.toWei("0.0001", "ether");

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
    setChange(change+1)
    setDone(true);
    return "충전 완료";
  });
  // 수연: 카카오페이 api 호출
  useEffect(() => {
    axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 75072266177df82ab4bc1574f658a897",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        tid: window.localStorage.getItem("tid"),
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: queryString,
      },
    })
      .then((res) => {
        parentPage();
        setPrice(res.data.amount.total);
        setDate(res.data.approved_at);
        setFlag(true);
        ChargePoint(res.data.amount.total);
      })
      .catch((error) => {
        console.log(error);
        setFlag(false);
        setDone(false);
      });
  }, []);

  if (flag && done) {
    return (
      <>
        <Container>
          <Box>
            <Heading>결제가 완료되었습니다.</Heading>
            <Text>
              포인트 내역 확인은 마이페이지의 포인트 탭에서 하실 수 있습니다.
            </Text>

            <Box>
              <Text>기부포인트 {price}P 충전</Text>
              <Text>날짜: {date}</Text>
              <InnerBox>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/profile", { replace: true });
                  }}
                >
                  마이페이지
                </Button>
              </InnerBox>
            </Box>
          </Box>
        </Container>
      </>
    );
  } else if (flag && !done) {
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
  } else {
    return (
      <>
        <Container>
          <Box>
            <Heading>결제가 취소되었습니다.</Heading>
            <Box>
              <Text>결제를 다시 진행해주세요.</Text>
              <InnerBox>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    parentPage("/point");
                  }}
                >
                  결제페이지로 돌아가기
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    parentPage("/");
                  }}
                >
                  메인으로 돌아가기
                </Button>
              </InnerBox>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
};

const Container = styled.main`
  ${tw`
  grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8
  `}
`;

const Box = styled.div`
  ${tw`
  text-center
  `}
`;

const InnerBox = styled.div`
  ${tw`
  mt-10 flex items-center justify-center gap-x-6
  `}
`;

const Heading = styled.h1`
  ${tw`
  mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl
  `}
`;

const Text = styled.p`
  ${tw`
  mt-6 text-base leading-7 text-gray-600
  `}
`;

const Button = styled.a`
  background-color: rgb(160, 200, 70);
  ${tw`
  rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
  `}
`;

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

export default PayResult;
