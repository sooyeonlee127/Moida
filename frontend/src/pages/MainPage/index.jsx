import React, { useEffect, useState } from "react";
import MainCard from "./components/MainCard";
import styled from "styled-components";
import tw from "twin.macro";
import "./main.css";
// import axios from "axios";
// window.addEventListener('scroll', () => {
//   document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
// }, false);

const cardList = document.querySelectorAll('.card')
const showCards = () => {
  const triggerBottom = window.innerHeight / 5 * 4;
  cardList.forEach(card => {
    const cardTop = card.getBoundingClientRect().top; // 이거 뭔지 알아볼 것

    if (cardTop < triggerBottom) {
      card.classList.add('show');
    } else {
      card.classList.remove('show');
    }
  })
}
window.addEventListener('scroll', showCards);




const MainPage = (props) => {
  

  // const getProjects = () => {
  //   axios({
  //     url: "/api/project",
  //     method: "GET",
  //   })
  //   .then(res => {
  //     console.log(res.response)
  //   })
  // }
  

  // getProjects()

  const cards = useState([
    {
      "id": 0,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리1",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: red;"
    },
    {
      "id": 1,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리2",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: green;"
    },
    {
      "id": 2,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리3",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: blue;"
    }

  ]);
  return (
    <Wrapper>
      <div className="intro"></div>
          {
            cards[0].map((card, index) => { 
              return (
                <Sticky key={index} >
                  <MainCard card={card}/>    
                </Sticky>
              )
            })
          }
      <div className="nft"></div>
      <div className="footer"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
width: 100vw;
position: absolute;
top: 64px;
left: 0;
`

const Sticky = styled.div`
height: 2000px;
width: 100%;
position: relative;
background-color: lightgray;
`
export default MainPage;
