import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState } from "react";
import axios from "axios";
import DonationCard from "./components";
// {
//     title: "Apple Watch",
//     image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
//     description: "",
//     alt: "",
//     href: "/donation/1"
// },
// {
//     title: "Apple Watch",
//     image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
//     description: "",
//     alt: "",
//     href: "/donation/2"
// },
// {
//     title: "Apple Watch",
//     image: "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
//     description: "",
//     alt: "",
//     href: "/donation/3"
// },

const DonationPage = () => {
  const [cards, setCards] = useState([]);
  const cardList = cards.map((card, index) => (
    <DonationCard card={card} key={index}></DonationCard>
  ));

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
    <WrapPage>
      <p>프로젝트 목록 관련 설명</p>
      <WrapCard>{cardList}</WrapCard>
    </WrapPage>
  );
};
const WrapPage = styled.div`
  width: 100%;
  ${tw`
  mt-16
  `}
`;
const WrapCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default DonationPage;
