import styled from "styled-components";
import tw from "twin.macro";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/auth";
import useValidator from "../../../../components/Validator";
import Modal from "../../../../components/Modal/index"

const UserStatus = () => {
  const navigate = useNavigate();

  const [ isOpen, setIsOpen ] = useState(false); // 비밀번호 변경 모달용 - 이은혁
  const submit = () => { // 비밀번호 변경 제출 - 이은혁
      api({
          url: "/users/me/password",
          method: "PUT",
          data: {
              currentPassword: curPw,
              newPassword: confirmPw
          },
          headers: {
              "accept": "*/*",
              "Authorization": localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
          }
      })
      .then((res) => { // 비밀번호 일치 시 모달 종료
          alert("비밀번호 변경 완료")
          setIsOpen(false)
      })
      .catch((err) => {
          console.log(err)
          setcurPwMMsg("기존의 비밀번호와 일치하지 않습니다.")
      })
  }

  // 유효성 검사 관련 state - 이은혁
  const [curPw, setCurPw ] = useState("");            // 기존 비밀번호 인풋값
  const [curPwMsg, setcurPwMMsg ] = useState();       // 기존 비밀번호 일치 여부 메시지 
  const [confirmPw, setConfirmPw ] = useState("");    // 새로운 비밀번호 확인 인풋값
  const [confirmMsg, setConfirmMsg ] = useState();    // 새로운 비밀번호 확인 유효성 검사 메시지
  
  const {fn: Validator, inputValue:newPw='', isValid, Msg} = useValidator() // newPw 기본값 지정. 안하면 오류 undefined 발생 - 이은혁
  // 순서대로 [유효성검사 메서드, input값, isvalid, 출력메시지]를 반환
  // 유효성검사 메서드는 인자로 'input type'과 'input value'을 받음

  const getMe = async () => {
    // 사용자 정보 가져오기 - 이은혁
    try {
      const response = await api({
        url: "/users/me",
        method: "GET",
        headers: {
          accept: "*/*",
          Authorization: localStorage.getItem("accessToken"), // 로컬스토리지의 나의 토큰 정보
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // useQuery 이용 시 자동으로 정보를 리패치 가능(자세한 useQuery 내용은 아래 링크 참조) - 이은혁
  // https://velog.io/@kimhyo_0218/React-Query-리액트-쿼리-시작하기-useQuery
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getMe"], // useState와 함께 쓸 경우 무한루프 발생할 수도 있으니 바로 컴포넌트에 참조할 것
    queryFn: getMe,
    refetchOnMount: true, // 데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션이다.
  });

  // 수연: 포인트 충전 페이지로 이동하기
  const goPage = (page) => {
    navigate(`/${page}`, { replace: false });
  };

  return (
    <>
      <Modal isOpen={isOpen} title={"비밀번호 변경"}>
        <Form action="">
          <label htmlFor="curpw">기존 비밀번호</label>
          <Input type="password" id="curpw" name="curpw" value={curPw} onChange={(e)=>setCurPw(e.target.value)} />
          <p>{curPwMsg}</p>
          <br/>

          <label htmlFor="newpw">새로운 비밀번호</label>
          <Input type="password" id="newpw" name="newpw" value={newPw} onChange={(e) => Validator("password",e.target.value)} />
          <p>{!isValid? Msg: ""}</p>

          <label htmlFor="confirmpw">새로운 비밀번호 확인</label>
          <Input type="password" id="confirmpw" name="confirmPw" 
            value={confirmPw} 
            onChange={(e) => {
              setConfirmPw(e.target.value);
              newPw!==e.target.value ? setConfirmMsg("비밀번호가 서로 다릅니다."):setConfirmMsg("")}}/>
          <p>{confirmMsg}</p>
          <ModalBtn type="submit" onClick={(e) => {e.preventDefault(); submit()}}>비밀번호 변경</ModalBtn>
          <ModalBtn onClick={() => setIsOpen(false)}>취소</ModalBtn>
        </Form>
      </Modal>
      <Wrapper>
        <MyMainNft/>
        <Status>
          <Nickname>{data?.info.nickname || "닉네임"} 님</Nickname>
          <Email>{data?.info.email || "ssafy@ssafy.com"}</Email>
          <Content>
          <p>
            <span>현재 내 포인트 {data?.info.point || "0"} P</span>
            <ChargeBtn onClick={(e) => {e.preventDefault();goPage("point");}}>충전하기</ChargeBtn>
          </p>
          <div className="ticket_sec">
            <p>보유한 티켓 수 {data?.info.ticketCnt || "0"} P</p>
            {/* <p>총 기부 포인트 {data?.info.totalPoint || "0"} P</p> */}
            <p>총 봉사 횟수 {data?.info.volunteerCnt || "0"} 회</p>
          </div>
          <div className="moi_sec">
            <p>내가 기부한 모이</p>
            <span>도토리 {data?.info.moiAcorn || "0"} 개</span>
            <span>옥수수 {data?.info.moiCorn || "0"} 개</span>
            <span>볍씨{data?.info.moiSeed || "0"} 개</span>
          </div>
        <Btn onClick={() => setIsOpen(true)}>비밀번호 변경</Btn>
        <Btn>Collection</Btn>
          </Content>
        </Status>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
margin: 0 auto;
max-width: 1000px;
display: flex;
flex-direction: row;
padding: 0px 0 40px 0;
`;
const MyMainNft = styled.div`
width: 220px;
height: 220px;
background-size: 220px;
background-image: url('https://openseauserdata.com/files/8da1deb8aca62959e0868e867d8f037f.svg')
`
const Status = styled.div`
flex-grow: 1;
text-align: left;
padding-left: 25px;
`
const Content = styled.div`
background-color: #F1F1E4;
border-radius: 10px;
`
const Nickname = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;
const Email = styled.span`
  font-size: 1rem;
  color: darkblue;
`;
const ChargeBtn = styled.button`
  ${tw`border px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 text-white active:bg-indigo-600`}
`;
const Btn = styled.button`
${tw`bg-sky-500 ring-1 rounded px-3 py-1 hover:bg-sky-400 active:bg-sky-500 mx-1`}
`
const Form = styled.form`
width: 100%;
padding: 0 30px;
`
const Input = styled.input`
border: 1px solid black;
padding: 2px 5px;
margin-bottom: 5px;
display: block;
width: 100%;

`

const ModalBtn = styled.button`
border: 1px solid #cacaca;
padding: 2px 10px;
margin: 20px 7px;
`
export default React.memo(UserStatus);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁
