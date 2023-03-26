<<<<<<< HEAD
import Projects from "./components/Projects";
=======
import React, { useState } from "react";
import MainCard from "./components/MainCard";
>>>>>>> 05be6667b57347424c1535573b60d9a185166964
import styled from "styled-components";
// import tw from "twin.macro";
import { useEffect, useRef } from "react";
import useScroll from './components/useScroll';
// import axios from "axios";

<<<<<<< HEAD


const MainPage = (props) => {
=======
const MainPage = () => {
>>>>>>> 05be6667b57347424c1535573b60d9a185166964
  // const getProjects = () => {
  //   axios({
  //     url: "/api/project",
  //     method: "GET",
  //   })
  //   .then(res => {
  //     console.log(res.response)
  //   })
  // }
<<<<<<< HEAD
  // getProjects()

=======

  // getProjects()

  const cards = useState([
    {
      id: 0,
      projectReqDto: {
        category: "CRANE",
        subject: "다람쥐와 도토리1",
        description: "다람쥐는 오늘도 도토리를 찾아 헤맵니다...",
      },
      donationResDto: {
        startDate: "2023-03-24",
        endDate: "2023-03-27",
        targetAmount: 1000000,
        subject: "다람쥐에게 도토리를 주세요",
        description: "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        id: 0,
        amount: 0,
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      }
    },
    {
      id: 1,
      projectReqDto: {
        category: "CRANE",
        subject: "다람쥐와 도토리2",
        description: "다람쥐는 오늘도 도토리를 찾아 헤맵니다...",
      },
      donationResDto: {
        startDate: "2023-03-24",
        endDate: "2023-03-27",
        targetAmount: 1000000,
        subject: "다람쥐에게 도토리를 주세요",
        description: "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        id: 0,
        amount: 0,
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      }
    },
    {
      id: 2,
      projectReqDto: {
        category: "CRANE",
        subject: "다람쥐와 도토리3",
        description: "다람쥐는 오늘도 도토리를 찾아 헤맵니다...",
      },
      donationResDto: {
        startDate: "2023-03-24",
        endDate: "2023-03-27",
        targetAmount: 1000000,
        subject: "다람쥐에게 도토리를 주세요",
        description: "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        id: 0,
        amount: 0,
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      }
    }

  ]);
>>>>>>> 05be6667b57347424c1535573b60d9a185166964
  return (
    <Wrapper>
      <div className="intro"></div>
      <Projects />
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


export default MainPage;
