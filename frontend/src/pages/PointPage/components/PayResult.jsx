import React from "react";
import axios from "axios";
import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PayResult = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // 에러 아님
  const queryString = searchParams.get("pg_token");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [flag, setFlag] = useState(false);
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
        console.log(res);
        setPrice(res.data.amount.total);
        setDate(res.data.approved_at);
        setFlag(true);
        parentPage();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (flag) {
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
                <Button href="/profile">마이페이지</Button>
              </InnerBox>
            </Box>
          </Box>
        </Container>
      </>
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
  ${tw`
  rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
  `}
`;
export default PayResult;
