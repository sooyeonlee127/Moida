import styled from "styled-components"
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/auth";
import useValidator from "../../../../components/Validator";
import Modal from "../../../../components/Modal/index"
import { GiAcorn, GiCorn, GiWheat } from 'react-icons/gi';

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
      {/* -------------------------------------------------------------- */}
      <Wrapper>
        <MyMainNft src={data?.info.nftUrl}/>
        <Status>
          <Nickname>{data?.info.nickname || "닉네임"} 님</Nickname>
          <Email>{data?.info.email || "ssafy@ssafy.com"}</Email>
          <Btn className="transparent" onClick={() => setIsOpen(true)}>비밀번호 변경</Btn>
          <Content>
            <Div className="half">
            <Div className="sec1">
              <Title>내가 기부한 모이</Title>
              <Div>
                  <Moi className="moi"><Circle style={{background:"#9d9d8e"}}><GiAcorn size="1.1rem" color="#ffffff"/></Circle>도토리 {data?.info.moiAcorn || "0"} 개</Moi>
                  <Moi className="moi"><Circle style={{background:"#9d9d8e"}}><GiCorn size="1.1rem" color="#ffffff"/></Circle>옥수수 {data?.info.moiCorn || "0"} 개</Moi>
                  <Moi className="moi"><Circle style={{background:"#9d9d8e"}}><GiWheat size="1.1rem" color="#ffffff"/></Circle>볍씨 {data?.info.moiSeed || "0"} 개</Moi>
              </Div>
            </Div>
            <Div className="sec2">
            <Title>총 봉사 횟수</Title>
            <p className="value">{data?.info.volunteerCnt || "0"} 회</p>
            </Div>
            </Div>
            <Div className="half">
            <Div className="sec3">
              <div>
                <Title>현재 내 포인트</Title>
                <p className="value">{data?.info.point || "0"} P</p>
                {/* <Btn onClick={(e) => {e.preventDefault();goPoint();}}>충전하기</Btn> */}
                <Btn onClick={(e) => {e.preventDefault();goPage("point");}}>충전</Btn>
                {/* <Btn onClick={(e) => {e.preventDefault();goPage("gas");}}>가스 충전하기</Btn> */}
              </div>
              <div>
                <Title>보유한 티켓 수</Title>
                <p className="value">{data?.info.ticketCnt || "0"} 장</p>
              </div>
            </Div>
            </Div>
          </Content>
        </Status>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
margin: 0 auto;
max-width: 900px;
display: flex;
flex-direction: row;
padding: 0px 0 25px 0;
color: #434343;
`;
const MyMainNft = styled.div`
width: 220px;
height: 220px;
border-radius: 20px;
background-size: 220px;
background-image: url(${(props)=>props.src})
`
const Status = styled.div`
flex-grow: 1;
text-align: left;
padding-left: 25px;
`
const Nickname = styled.span`
font-size: 1.5rem;
font-weight: 700;
`;
const Email = styled.span`
font-size: 1rem;
color: #9c9c9c;
margin-left: 10px;
`;
const Moi = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
margin-top: 5px;
font-size: 0.9rem;
`
const Content = styled.div`
background-color: #F1F1E4;
border-radius: 10px;
display: flex;
flex-direction: row;
margin-top: 15px;
height: 170px;
padding: 20px 0;
`
const Div = styled.div`
&.half {
  width: 50%;
  display: flex;
  flex-direciton: row;
  justify-content: space-between;
  padding: 0 30px;
}
&.half:first-child {
  border-right: 1px solid #ADADAD;
}
&.sec1 {
  width: 145px;
}
&.sec2, &.sec3 {
  &.sec2>.value{
    font-size: 1.4rem;
    text-align: center;
    margin-top: 20px;
    font-weight: 700;
  }
  &.sec3>div>.value{
    font-size: 1.2rem;
    text-align: center;
    font-weight: 700;
  }
  &.sec3>div>p {
    display: inline-block;
  }
  &.sec3>div>p:first-child {
    margin-right: 10px;
    width: 100px;
  }
}
&.sec3>div {
  margin-bottom: 10px;
}
`
const Title = styled.p`
font-size: 0.9rem;
font-weight: 200;
color: gray;
text-align: left;
margin-bottom: .5rem;
`
const Circle = styled.div`
padding: 5px;
display: inline-block;
border-radius: 15px;
margin-right: 20px;
`
const Btn = styled.button`
border-radius: 5px;
background: #0000000d;
padding: 1px 7px;
font-size: 0.9rem;
color: #747474;
margin-left: 10px;
&:hover {
  background: #c6e286;
}
&:active {
  background: #b8d27d;
}
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
