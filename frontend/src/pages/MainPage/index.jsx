import React, { useState } from "react";
import MainCard from "./components/MainCard";

const MainPage = () => {
  const cards = useState([
    {
      title: "도토리 프로젝트",
      content: "멋진 프로젝트입니다.",
      href: "/donation/1",
    },
    {
      title: "볍씨 프로젝트",
      content: "최고의 프로젝트입니다.",
      href: "/donation/2",
    },
    {
      title: "옥수수 프로젝트",
      content: "야생동물 프로젝트입니다.",
      href: "/donation/3",
    },
  ]);
  const cardList = cards[0].map((card) => <MainCard card={card}></MainCard>);
  return (
    <>
      <ul>{cardList}</ul>
    </>
  );
};
export default MainPage;
