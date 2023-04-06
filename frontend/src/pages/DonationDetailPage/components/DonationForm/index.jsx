import styled from "styled-components";
import tw from "twin.macro";
import { useState, useCallback, useContext } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../../../api/auth";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { AuthContext } from "../../../../context/Auth";
import Modal from "../../../../components/Modal";
import loadingspinner from "../../../../assets/img/loadingspinner.svg";
import { useNavigate } from "react-router-dom";

const DonationForm = (props) => {
  // props 정보 - 이은혁 ----------------------------------------
  const data = {
    generation: props.gen,
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
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

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
    () => setMoney(moi * parseInt(data?.pointPerMoi)),
    [moi, data?.pointPerMoi]
  ); // 1모이-포인트 환율 수정 - 이은혁

  const donationMutation = useMutation(async (trans) => {
    let transactionData = {
      hash: trans.hash,
      fromHash: trans.from,
      toHash: trans.to,
      nonce: trans.nonce,
      gas: trans.gas,
      gasPrice: trans.gasPrice,
      maxFeePerGas: trans.maxFeePerGas,
      maxPriorityFeePerGas: trans.maxPriorityFeePerGas,
      r: trans.r,
      s: trans.s,
      v: trans.v,
      value: trans.value,
      input: trans.input,
    };

    // console.log("? : " + transactionData);

    return api({
      url: "/project/donation",
      method: "POST",
      data: {
        projectId: data.id,
        moi: moi,
        transactionDto: transactionData,
      },
      headers: {
        accept: "*/*",
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        return response;
      })
      .catch((error) => {
        setIsOpen(false);
        alert(error.response.data.message);
        return error;
      });
  });

  const SendMoi = async () => {
    // console.log("point:", point);
    if (money <= 0) {
      // 기부 금액이 없는 경우 - 이은혁
      return alert("모이는 최소 1개 이상 기부가 가능합니다.");
    } else if (money > point) {
      return alert("보유 포인트가 부족합니다.");
    }
    // 수연: 메타마스크 연결되지 않을 때
    if (!account) {
      alert(
        "메타마스크가 연결되어있지 않습니다. 메타마스크 연결 페이지로 이동합니다."
      );
      navigate("/check", { replace: false });
    } else {
      setText("메타마스크 결제가 진행중입니다..");
      setIsLoading(true);
      setIsOpen(true);
      try {
        const trans = await donatePoint(money);
        // console.log("sendmoi에서 await donatePoint 결과 : " + trans);
        if (trans) {
          donationMutation.mutateAsync(trans).then((res) => {
            if (res.status === 200) {
              setIsOpen(true);
              setMoney(0); // 금액 초기화 - 이은혁
              setMoi(0); // 모이 갯수 초기화 - 이은혁
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  // 수연: 블록체인 -----------------------------------------------------------
  const { point } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const {
    library,
    activate,
    connector,
    account, // DApp에 연결된 account address
    active, // DApp 유저가 로그인 된 상태인지 체크
  } = useWeb3React();

  const donatePoint = useCallback(async (point) => {
    const coinbase = process.env.REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY;
    // console.log("donatePoint : " + account);
    const web3 = new Web3(window.ethereum);
    var today = new Date();
    const tmp = `${localStorage.getItem("nickname")} | ${point} | ${
      data.subject
    } | ${today}`; // 닉네임, 금액, 프로젝트 소제목, 일시
    const test = web3.utils.stringToHex(tmp);
    const tx = {
      from: account,
      to: coinbase, // 다른 지갑 하나 필요함
      data: test,
    };
    try {
      const result = await web3.eth.sendTransaction(tx);
      const transaction = await web3.eth.getTransaction(result.transactionHash);
      setIsLoading(false);
      setText("모이 " + moi + "개가 정상적으로 기부되었습니다.");
      // console.log("기부 완료");
      return transaction;
    } catch {
      setIsOpen(false);
      alert("거래가 중지되었습니다.");
    }
  });

  return (
    <>
      <Modal isOpen={isOpen} title={"기부하기"}>
        <div>
          <p>{text}</p>
        </div>
        <div>
          {isLoading ? (
            <ImageBox>
              <Image src={loadingspinner} alt="" width="200" />
            </ImageBox>
          ) : (
            <ModalBtn
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setText("");
                setIsLoading(true);
              }}
            >
              나가기
            </ModalBtn>
          )}
        </div>
      </Modal>

      <Div>
        <Text className="size-5 weight-6 left color-3">[{data.generation}차] {data.subject}</Text>
        <Text className="size-2 weight-2 left color-3 period">
          {new Date(data.startDate).getFullYear()}년{" "}
          {new Date(data.startDate).getMonth() + 1}월{" "}
          {new Date(data.startDate).getDate()}일 ~
          {new Date(data.endDate).getFullYear()}년{" "}
          {new Date(data.endDate).getMonth() + 1}월{" "}
          {new Date(data.endDate).getDate()}일
        </Text>
        <Text className="size-2 weight-2 left color-3">{data.description}</Text>
        <div className="progressbar">
          <Text className="size-4 weight-6 left">{(data.targetAmount / data.pointPerMoi)?.toLocaleString("ko-KR")}개</Text>
          <ProgressBar value={ratio} min="0" max="100" />
          <Text className="size-3 weight-6 right">
          {data.amount / data.pointPerMoi}개 ({parseInt(ratio)}%)
          </Text>
        </div>
        <div>
          <Text className="size-4 weight-9 right">{moi?.toLocaleString("ko-KR")} 개</Text>
          <Text className="size-1 weight-2 right">{money?.toLocaleString("ko-KR")} 포인트 기부</Text>
          <CoinButtonGroup>
            <button onClick={() => setMoi(moi + 1)}>+ 1개</button>
            <button onClick={() => setMoi(moi + 5)}>+ 5개</button>
            <button onClick={() => setMoi(moi + 10)}>+ 10개</button>
            <button onClick={() => setMoi(moi + 50)}>+ 50개</button>
          </CoinButtonGroup>
        </div>
        <GroupButton>
          <Button className="reset" onClick={() => setMoi(0)}>초기화</Button>
          <Button onClick={SendMoi} disabled={isDisabled} className={isDisabled ? "disabled donation" : "enabled donation"}>기부하기</Button>
          {/* 마감 기한이 지날 경우 isDisabled true */}
        </GroupButton>
      </Div>
    </>
  );
};
const Div = styled.div`
  & > .progressbar {
    padding-bottom: 15px;
    border-bottom: 1px solid #e7e7e7;
    margin: 20px 0 15px 0;
    line-height: normal;
  }
  & > .period {
    margin: 2px 0 13px 0;
  }
`;
const CoinButtonGroup = styled.div`
  ${tw`grid grid-cols-4 gap-1 `}
  margin-top: 15px;
  & > button {
    font-size: 0.85rem;
    border-width: 1px;
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
  }
  & > button:hover {
    background-color: #adda49;
    color: white;
  }
  & > button:active {
    background-color: #a0c846;
  }
`;

const GroupButton = styled.div`
  ${tw`space-x-3`}
  display: flex;
  & > button:first-child {
    flex-basis: 30%;
  }
  & > button:last-child {
    flex-basis: 70%;
  }
`;

const Button = styled.button`
border-radius: 10px;
margin: 20px 0 0 0;
padding: 10px 3px;
&.donation {
  background: #A0C846;
  color: white;
  font-weight: 500;
}
&.donation.enabled:hover {
  background: #a9d34b;
}
&.donation.enabled:active {
  background: #9ac240;
}
&.reset {
  border: 1px solid #575757;
}
&.reset:hover {
  border-color: #83a634;
  color: #83a634;
}
&.reset:active {
  background #fafafa;
}
&.disabled {
  opacity: 0.5;
}
`;
const ProgressBar = styled.progress`
  width: 100%;
  height: 6px;
  border-radius: 44px;
  overflow: hidden;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: #d4d4d4;
  }
  &::-webkit-progress-value {
    background-color: #67b58b;
  }
`;
const Text = styled.p`
  color: #594949;

  &.dday {
    color: #dc653f;
  }
  &.center {
    text-align: center;
  }
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  &.weight-9 {
    font-weight: 900;
  }
  &.weight-6 {
    font-weight: 600;
  }
  &.weight-5 {
    font-weight: 500;
  }
  &.weight-2 {
    font-weight: 200;
  }
  &.size-6 {
    font-size: 1.5rem;
  }
  &.size-5 {
    font-size: 1.35rem;
  }
  &.size-4 {
    font-size: 1.2rem;
  }
  &.size-3 {
    font-size: 1rem;
  }
  &.size-2 {
    font-size: 0.9rem;
  }
  &.size-1 {
    font-size: 0.85rem;
  }
`;
const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

const ModalBtn = styled.button`
  border: 1px solid #cacaca;
  padding: 2px 10px;
  margin: 20px 7px;
`;

export default DonationForm;
