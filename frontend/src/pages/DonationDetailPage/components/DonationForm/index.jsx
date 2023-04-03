import styled from "styled-components";
import tw from "twin.macro";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../../../api/auth";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import MetamaskCheck from "../../../../components/MetamaskCheck";
const DonationForm = (props) => {
  // props 정보 - 이은혁 ----------------------------------------
  const data = {
    startDate: props.data?.startDate,
    endDate: props.data?.endDate,
    targetAmount: props.data?.targetAmount,
    subject: props.data?.subject,
    description: props.data?.description,
    id: props.data?.id,
    amount: props.data?.amount,
    pointPerMoi: props?.pointPerMoi || 0, // 1모이 포인트 환율
  };
  // -----------------------------------------------------------

  // 디데이 관련 - 이은혁 ----------------------------------------
  const [dDay, setDday] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const endDate = new Date(data.endDate);
    const startDate = new Date(data.startDate);
    const now = new Date();
    if (now > new Date(endDate)) {
      // 마감기한이 지난 경우 isDisabled true -> 버튼 비활성화 목적 - 이은혁
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setDday(parseInt(endDate.getDate()) - parseInt(startDate.getDate())); // 디데이 계산 후 값 상태 1번 변경 - 이은혁
  }, [data.endDate, data.startDate]);
  // -----------------------------------------------------------

  const ratio = String(
    (parseInt(data.amount) / parseInt(data.targetAmount)) * 100
  ); // 현재 기부금액/목표금액*100 비율
  // => 반환값 0~100사이 정수 => 문자로 변경 - 이은혁
  const [money, setMoney] = useState(0);
  const [moi, setMoi] = useState(0);
  useEffect(
    () => setMoney(moi * parseInt(data.pointPerMoi)),
    [moi, data.pointPerMoi]
  ); // 1모이-포인트 환율 수정 - 이은혁

  const donationMutation = useMutation(async () => {
    return api({
      url: "/project/donation",
      method: "POST",
      data: {
        projectId: data.id,
        moi: moi,
      },
      headers: {
        accept: "*/*",
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        return error;
      });
  });

  const SendMoi = () => {
    if (money <= 0) {
      // 기부 금액이 없는 경우 - 이은혁
      return alert("모이는 최소 1개 이상 기부가 가능합니다.");
    }
    donationMutation
      .mutateAsync()
      .then((res) => {
        if (res.status === 200) {
          donatePoint(money);
          setMoney(0); // 금액 초기화 - 이은혁
          setMoi(0); // 모이 갯수 초기화 - 이은혁
          alert("모이 " + moi + "개가 정상적으로 기부되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 수연: 블록체인 -----------------------------------------------------------
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const {
    account, // DApp에 연결된 account address
    active, // DApp 유저가 로그인 된 상태인지 체크
  } = useWeb3React();

  const donatePoint = useCallback(async (point) => {
    const coinbase = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY;
    console.log("donatePoint : " + account);

    const web3 = new Web3(window.ethereum);

    var today = new Date();
    const tmp = `${localStorage.getItem("nickname")} | ${point} | ${
      data.subject
    } | ${today}`;     // 닉네임, 금액, 프로젝트 소제목, 일시
    const test = web3.utils.stringToHex(tmp);
    const tx = {
      from: account,
      to: coinbase, // 다른 지갑 하나 필요함
      data: test,
    };

    const result = await web3.eth.sendTransaction(tx);
    return result.transactionHash; //db 저장해야됨
  });

  // ---------------------------------------------------------------------------
  return (
    <div>
      <span>D-{dDay}</span>
      <p>{data.subject}</p>
      <p>
        기간 : {data.startDate} ~ {data.endDate}
      </p>
      <p>설명 : {data.description}</p>
      <p>목표 모이량 : {data.targetAmount}개</p>
      <p>현재 기부 모이량 : {data.amount}개</p>
      <div>
        <p>{ratio}%</p>
        기부 목표금액
        <br />
        <progress id="progress" value={ratio} min="0" max="100" />
        현재 모금액
      </div>
      <div>
        <p>
          {moi}개 ({money}원)
        </p>
        <CoinButtonGroup>
          <CoinButton onClick={() => setMoi(moi + 1)}>1개</CoinButton>
          <CoinButton onClick={() => setMoi(moi + 5)}>5개</CoinButton>
          <CoinButton onClick={() => setMoi(moi + 10)}>10개</CoinButton>
          <CoinButton onClick={() => setMoi(moi + 50)}>50개</CoinButton>
        </CoinButtonGroup>
      </div>
      <GroupButton>
        <Button onClick={() => setMoi(0)}>초기화</Button>
        <Button
          onClick={SendMoi}
          disabled={isDisabled}
          className={isDisabled ? "disabled" : ""}
        >
          기부하기
        </Button>
        {/* 마감 기한이 지날 경우 isDisabled true */}
      </GroupButton>
      <MetamaskCheck />
    </div>
  );
};
const CoinButtonGroup = styled.div`
  ${tw`grid grid-cols-4 gap-1 `}
`;

const CoinButton = styled.button`
  ${tw`border px-3 py-1 hover:bg-sky-500 active:bg-sky-600`}
`;

const GroupButton = styled.div`
  ${tw`flex space-x-3`}
`;

const Button = styled.button`
  ${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
  &.disabled {
    opacity: 0.5;
  }
`;
export default DonationForm;
