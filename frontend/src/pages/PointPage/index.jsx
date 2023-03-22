import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

const PointPage = () => {
  const [currentPoint, setCurrentPoint] = useState(0);

  const donate = (price) => {
    setCurrentPoint(currentPoint + price);
  };

  const [kakaoUrl, SetKakaoUrl] = useState("");

  useEffect(() => {
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 75072266177df82ab4bc1574f658a897",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      next_redirect_pc_url: "",
      tid: "",
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "초코파이",
        quantity: 1,
        total_amount: 2200,
        tax_free_amount: 0,
        vat_amount: 200,
        approval_url: "http://localhost:3000/payresult",
        fail_url: "http://localhost:3000/payresult",
        cancel_url: "http://localhost:3000/payresult",
      },
    })
      .then((res) => {
        console.log(res.data.next_redirect_pc_url);
        window.localStorage.setItem("tid", res.data.tid);
        SetKakaoUrl(res.data.next_redirect_pc_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const kakaoPay = () => {
    console.log("카카오페이");
    window.open(kakaoUrl);
  };

  return (
    <PointContainer>
      <LeftSide>
        <Heading>블록체인 사진</Heading>
      </LeftSide>
      <RightSide>
        <PointForm>
          <Box>
            <InnerBox>
              <Text>금액</Text>
              <Text>{currentPoint} 원</Text>
            </InnerBox>
          </Box>
          <Box>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                setCurrentPoint(0);
              }}
            >
              초기화
            </PointButton>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(50000);
              }}
            >
              +50000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(10000);
              }}
            >
              +10000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(5000);
              }}
            >
              +5000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(1000);
              }}
            >
              +1000
            </PointButton>
          </Box>

          <Box>
            <InnerBox>
              <Text>최종 결제 금액</Text>
            </InnerBox>
            <Text>카카오페이 API</Text>
          </Box>
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              kakaoPay();
            }}
          >
            결제하기
          </SubmitButton>
        </PointForm>
      </RightSide>
    </PointContainer>
  );
};

const PointContainer = styled.div`
  ${tw`
  mx-auto max-w-2xl px-4 pt-10 pb-16
  grid grid-cols-2 gap-2
  `}
`;

const LeftSide = styled.div`
  ${tw`
  row-span-3

`}
`;

const RightSide = styled.div`
  ${tw`
  row-span-3
mt-4 lg:row-span-3 lg:mt-0
`}
`;

const InnerBox = styled.div`
  ${tw`
flex items-center justify-between
`}
`;

const Box = styled.div`
  ${tw`
mt-10
`}
`;

const Heading = styled.h1`
  ${tw`
  text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl
`}
`;

const PointForm = styled.form`
  ${tw`
  mt-10
`}
`;
const PointButton = styled.button`
  ${tw`
  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1
  `}
`;

const Text = styled.h3`
  ${tw`
text-sm font-medium text-gray-900
`}
`;

const SubmitButton = styled.button`
  ${tw`
  border px-2 py-2 hover:bg-sky-500 active:bg-sky-600
  `}
`;

export default PointPage;
