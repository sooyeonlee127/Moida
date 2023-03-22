import styled from "styled-components"
import tw from "twin.macro"
import { useState } from "react"


const DonationForm = () => {
    const ratio = 50;
    const [money, setMoney] = useState(0);
    // const addMoney = (m) => {
    //     setMoney(money + m)
    // } 

    // const ratio = parseInt(모금액/목표금액*100) => 반환값 0~100사이 정수
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
                <p>{money} 원</p>
                <CoinButtonGroup>
                    <CoinButton onClick={() => setMoney(money + 1000)}>1,000원</CoinButton>
                    <CoinButton onClick={() => setMoney(money + 5000)}>5,000원</CoinButton>
                    <CoinButton onClick={() => setMoney(money + 10000)}>10,000원</CoinButton>
                    <CoinButton onClick={() => setMoney(money + 50000)}>50,000원</CoinButton>
                </CoinButtonGroup>
            </div>
            <GroupButton>
                <Button onClick={() => setMoney(0)}>초기화</Button>
                <Button>기부하기</Button>
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