import styled from 'styled-components'
import { useState } from 'react'
import DonationList from './Components/DonationList'
import VolunteerList from './Components/VolunteerList'
import PointWallet from './Components/PointWallet';
import MyReviews from "./Components/MyReviews";
import "./Components/Tab.css";

const menuArr = [
    { name: '기부내역', content: 'Tab menu ONE' },
    { name: '봉사내역', content: 'Tab menu TWO' },
    { name: '포인트 내역', content: 'Tab menu THREE' },
  ];

const UserContent = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Wrapper>
          <InnerContent>
            <Title>나의 기록</Title>
            <Section>
            <TabGroup>
                <Ul>
                  {menuArr.map((element, index)=>{
                      return (
                      <Li key={index} className={tabIndex === index ? "submenu focused" : "submenu"}
                      onClick={()=> setTabIndex(index)}>{element.name}</Li>
                      )
                  })}
                </Ul>
            </TabGroup>
            <Desc>
              {tabIndex === 0 ? <DonationList/>: "" }
              {tabIndex === 1 ? <VolunteerList/>: "" }
              {tabIndex === 2 ? <PointWallet/>: "" }
            </Desc>
            </Section>
            <Title>내가 쓴 글</Title>
            <Section>
            <MyReviews/>
            </Section>
          </InnerContent>
        </Wrapper>
    )
}
const Wrapper = styled.div`
display: flex;
flex-direction: column;
background: white;
border-top: 1px solid #DFDFDF;
padding: 40px 0;
`;
const InnerContent = styled.div`
margin: 0px auto;
max-width: 1000px;
width: 100%;
`

const Section = styled.div`
min-height: 300px;
height: 100%;
display: flex;
-webkit-box-pack: justify;
justify-content: flex-start;
-webkit-box-align: center;
align-items: center;
flex-direction: column;
`
const Title = styled.h1`
font-weight: 600;
font-size: 1.4rem;
text-align: left;
`
const TabGroup = styled.div`
width: 100%;
`
const Ul = styled.ul`
color: rgba(73, 73, 73, 0.5);
font-weight: bold;
display: flex;
flex-direction: row;
justify-items: center;
align-items: center;
list-style: none;
cursor : pointer;
border-bottom: 1px solid #838383;

.submenu {
    ${'' /* 기본 Tabmenu 에 대한 CSS를 구현합니다. */}
    display: flex;
    justify-content: space-between;
    padding : 10px 25px;
    font-size : 15px;
  }

  .focused {
    ${'' /* 선택된 Tabmenu 에만 적용되는 CSS를 구현합니다.  */}
    color : black;
    font-weight: 700;
    border-bottom: 2px solid #838383;
  }

  & div.desc {
    text-align: center;
  }
`

const Li = styled.li`

`
const Desc = styled.div`
width: 100%;
`;
export default UserContent