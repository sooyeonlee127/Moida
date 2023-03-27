import styled from "styled-components"
import tw from "twin.macro"
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react";


const DonationForm = () => {
    const ratio = 50;
    // const ratio = parseInt(모금액/목표금액*100) => 반환값 0~100사이 정수 - 이은혁

    const [money, setMoney] = useState(0);
    const [moi, setMoi] = useState(0);


    useEffect(() => setMoney(moi*1400), [moi])    // 원-모이 환율 수정 필요 - 이은혁

    
    const SendMoiApi = () => {  // 기부 API: 기부하기 버튼 클릭 시 작동 - 이은혁
        
        if (money<=0) {     // 기부 금액이 없는 경우 - 이은혁
            return alert("모이는 최소 1개 이상 기부가 가능합니다.")
        } 
        axios({
            url: "/api/project/donation",
            method: "POST",
            data: {
                projectId: "1",     // 하드코딩 수정 필요 - 이은혁
                moi: moi
            },
            headers: {
                "accept": "*/*",
                "Authorization": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log(res.data)
            setMoney(0)     // 금액 초기화 - 이은혁
            setMoi(0)       // 모이 갯수 초기화 - 이은혁
            alert("모이 "+moi+"개가 정상적으로 기부되었습니다.")
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    
    return (
        <div>
            <span>D-day</span>
            <p>Title</p>
            <p>content</p>
            <div>
                <p>{ratio}%</p>
                기부 목표금액<br/>
                <progress id="progress" value={ratio} min="0" max="100" />
                현재 모금액
            </div>
            <div>
                <p>{moi}개 ({money}원)</p>
                <CoinButtonGroup>
                    <CoinButton onClick={() => setMoi(moi + 1)}>1개</CoinButton>
                    <CoinButton onClick={() => setMoi(moi + 5)}>5개</CoinButton>
                    <CoinButton onClick={() => setMoi(moi + 10)}>10개</CoinButton>
                    <CoinButton onClick={() => setMoi(moi + 50)}>50개</CoinButton>
                </CoinButtonGroup>
            </div>
            <GroupButton>
                <Button onClick={() => setMoi(0)}>초기화</Button>
                <Button onClick={SendMoiApi}>기부하기</Button>
            </GroupButton>
        </div>
    )
}
const CoinButtonGroup = styled.div`
${tw`grid grid-cols-4 gap-1 `}
`

const CoinButton = styled.button`
${tw`border px-3 py-1 hover:bg-sky-500 active:bg-sky-600`}
`

const GroupButton = styled.div`
${tw`flex space-x-3`}
`

const Button = styled.button`
${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
`
export default DonationForm;