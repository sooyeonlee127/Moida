import styled from 'styled-components'
import tw from 'twin.macro'
import { useQuery } from "@tanstack/react-query";
import React from 'react';
import api from '../../../../api/auth';

const UserStatus = () => {
   
    const getMe = async () => { // 사용자 정보 가져오기 - 이은혁
        try {
            const response = await api({
                url: "/users/me",
                method: "GET",
                headers: {
                accept: "*/*",
                Authorization: localStorage.getItem("accessToken"), // 로컬스토리지의 나의 토큰 정보
            },
          });
          return response.data
        } catch (error) {
          console.error(error);
          return null;
        }
    };
    
    // useQuery 이용 시 자동으로 정보를 리패치 가능(자세한 useQuery 내용은 아래 링크 참조) - 이은혁
    // https://velog.io/@kimhyo_0218/React-Query-리액트-쿼리-시작하기-useQuery
    const { data, isError, isLoading } = useQuery({ queryKey: ["getMe"],  // useState와 함께 쓸 경우 무한루프 발생할 수도 있으니 바로 컴포넌트에 참조할 것
        queryFn: getMe,
        refetchOnMount: true, // 데이터가 stale 상태일 경우 마운트 시 마다 refetch를 실행하는 옵션이다.
    })


    return (
        <Wrapper>
            <Nickname>닉네임</Nickname>
            <Email>ssafy@gmail.com</Email>
            <div>
                <span>현재 내 포인트 {data? data.point : "0"} P</span>
                <ChargeBtn>충전하기</ChargeBtn>
            </div>
            <p>총 기부 금액 {data? data.totalPoint : "0"} P</p>
            <p>총 봉사 횟수 {data? data.volunteerCnt : "0"} 회</p>
        </Wrapper>
    )
}
const Wrapper = styled.div`
flex;
flex-direction: row;
justify-content: start;
text-align: left;
`

const Nickname = styled.p`
font-size: 1.5rem;
font-weight: 700;
`
const Email = styled.p`
font-size: 1rem;
color: darkblue;
`
const ChargeBtn = styled.button`
${tw`border px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 text-white active:bg-indigo-600`}
`

export default React.memo(UserStatus); 
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁