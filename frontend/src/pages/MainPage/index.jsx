import Projects from "./components/Projects";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Intro from "./components/Intro"

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const cardList = cards.map((card, index) => <Projects card={card} key={index}></Projects>);
  useEffect(() => {
    // 수연: project 받아오기
    axios({
      url: "/api/project",
      method: "GET",
    })
      .then((res) => {
        // console.log(res);
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <Intro />
      <ul>{cardList}</ul>
      <div className="nft"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;

export default MainPage;
