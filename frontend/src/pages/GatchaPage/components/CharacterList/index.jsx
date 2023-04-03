import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { BlockContext } from "../../../../context/BlockChain";

const CharacterList = () => {
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(10); // 한 페이지에 보여줄 아이템 수
  const [list, setList] = useState([]);
  const { nftCnt } = useContext(BlockContext);
  const character = list.map((nft, index) => (
    <div>
      <Image src={nft.imageUrl} alt="" width="250" />
      <p>{nft.name}</p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            changeMainNft(nft.nftId);
          }}
        >
          대표이미지 지정
        </button>
      </p>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(nft.metaDataUrl);
          }}
        >
          metadata 확인
        </button>
      </p>
    </div>
  ));
  // 대표 nft 지정
  const changeMainNft = async (id) => {
    // 카드 id 입력
    axios({
      url: "/api/users/me/image?nftId=" + id,
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
    })
      .then((res) => {
        alert("대표 이미지가 지정되었습니다. 마이페이지에서 확인해주세요!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userNftList = async () => {
    axios({
      url: "/api/users/me/nft?pageNumber=" + pageNum + "&pageSize=" + pageSize,
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
    })
      .then((res) => {
        setList(res.data.nftList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userNftList();
  }, [nftCnt]);

  return (
    <Container>
      <h1>CharacterList</h1>
      <CharacterBox>{character}</CharacterBox>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fafaf3;
  height: 89vh;
  width: 100vw;
  ${tw`
  items-center justify-center
  `}
`;

const CharacterBox = styled.div`
  ${tw`
  grid grid-cols-5 gap-2 ml-10
  `}
`;

const Image = styled.img``;
export default CharacterList;
