import styled from "styled-components";
import tw from "twin.macro";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import DonationCard from "./components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

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
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const goCreateProject = () => {
    navigate(`/admin/project/create`, { replace: false });
  };
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
      <Box>
        {role === "ROLE_ADMIN" ? (
          <>
            <AdminButton
              onClick={(e) => {
                e.preventDefault();
                goCreateProject();
              }}
            >
              프로젝트 생성하기
            </AdminButton>
          </>
        ) : (
          <></>
        )}
      </Box>
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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  ${tw`
  my-5 mx-10
  `}
`;

const AdminButton = styled.button`
  background-color: rgb(160, 200, 70);
  ${tw`
  rounded-sm px-3 py-1 mx-1
  `}
`;

export default DonationPage;
