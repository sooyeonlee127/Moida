import Projects from "./components/Projects";
import Intro from "./components/Intro"
import Nft from "./components/Nft";
import Footer from "../../components/Footer/Index"
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Intro from "./components/Intro"
import { useWeb3React } from "@web3-react/core";

const MainPage = () => {
  const [cards, setCards] = useState([]);
  const cardList = cards.map((card, index) => <Projects card={card} index={index} key={index}></Projects>);
  useEffect(() => {
    // 수연: project 받아오기
    axios({
      url: "/api/project",
      method: "GET",
    })
      .then((res) => {
        setCards(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <Intro />
      <div>{cardList}</div>
      <Nft />
      <Footer/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: #FAFAF3;
`;

export default MainPage;
