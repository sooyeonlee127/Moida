import styled from 'styled-components'
import { useState } from 'react'
import DonationList from './Components/DonationList'
import VolunteerList from './Components/VolunteerList'
import PointWallet from './Components/PointWallet';


const menuArr = [
    { name: '기부내역', content: 'Tab menu ONE' },
    { name: '봉사내역', content: 'Tab menu TWO' },
    { name: '포인트 내역', content: 'Tab menu THREE' },
  ];

const UserContent = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div>
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
        </div>
    )
}
const TabGroup = styled.div`
`


const Ul = styled.ul`
background-color: #dcdcdc;
color: rgba(73, 73, 73, 0.5);
font-weight: bold;
display: flex;
flex-direction: row;
justify-items: center;
align-items: center;
list-style: none;
margin-bottom: 7rem;
cursor : pointer;

.submenu {
    ${'' /* 기본 Tabmenu 에 대한 CSS를 구현합니다. */}
    display: flex;
    justify-content: space-between;
    padding : 10px;
    font-size : 15px;
  }

  .focused {
    ${'' /* 선택된 Tabmenu 에만 적용되는 CSS를 구현합니다.  */}
    background-color: darkblue;
    color : white
  }

  & div.desc {
    text-align: center;
  }
`

const Li = styled.li`

`
const Desc = styled.div`
`;
export default UserContent