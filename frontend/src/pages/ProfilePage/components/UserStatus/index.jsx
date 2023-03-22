import styled from 'styled-components'
import tw from 'twin.macro'

const UserStatus = () => {
    const point = 10000;
    const donatedPoint = 120000;
    const volunteerCount = 12;
    return (
        <Wrapper>
            <Nickname>닉네임</Nickname>
            <Email>ssafy@gmail.com</Email>
            <div>
                <span>현재 내 포인트 {point} P</span>
                <ChargeBtn>충전하기</ChargeBtn>
            </div>
            <p>총 기부 금액{donatedPoint} P</p>
            <p>총 봉사 횟수{volunteerCount} 회</p>
        </Wrapper>
    )
}
const Wrapper = styled.div`
flex;
flex-direction: row;
justify-content: start;
text-align: left;
padding: 20px 30px;
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
export default UserStatus