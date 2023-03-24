import React, { useEffect, useState } from "react";
import MainCard from "./components/MainCard";
// import axios from "axios";

const MainPage = () => {
  

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
      }
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
      }
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
      }
    }

  ]);

  const cardList = cards[0].map((card) => <MainCard card={card}></MainCard>);
  return (
    <>
      <ul>{cardList}</ul>
    </>
  );
};
export default MainPage;
