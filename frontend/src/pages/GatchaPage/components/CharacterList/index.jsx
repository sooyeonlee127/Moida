import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { BlockContext } from "../../../../context/BlockChain";
import star from "../../../../assets/img/star.png";
import Paging from "../../../../components/Pagination/Paging";
const CharacterList = () => {
  const [list, setList] = useState([]);
  const { nftCnt } = useContext(BlockContext);
  const [length, setLength] = useState(0); // 전체 데이터 갯수 저장(페이지네이션) - 이은혁
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(8); // 한 페이지에 보여줄 아이템 수

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
        setLength(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userNftList();
  }, [nftCnt, pageNum]);

  return (
    <Wrapper>    
      <Container>
      <TitleBox>
        <Title>My Collection</Title>
      </TitleBox>
      <CharacterContainer>
        {list.length === 0 ? (
          <p>보유 중인 NFT가 없습니다.</p>
        ) : (
          <></>
        )}
        <CharacterBox>
          {list?.map((element, index) => {
            return (
              <>
                <NftBox>
                  <StarButton
                    onClick={(e) => {
                      e.preventDefault();
                      changeMainNft(element.nftId);
                    }}
                  >
                    <StarImage src={star} alt="" width="30" />
                  </StarButton>
                  <NftInfo>{element.name}</NftInfo>
                  <Image
                    src={element.imageUrl}
                    index={index}
                    key={index}
                    alt="이미지가 없어요"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(element.metaDataUrl);
                    }}
                  />
                </NftBox>
              </>
            );
          })}
        </CharacterBox>
        <TitleBox>
          <Paging
            page={pageNum}
            totalItem={length}
            setPage={(e) => setPageNum(e)}
          />
        </TitleBox>
      </CharacterContainer>
    </Container>
  </Wrapper>
  );
};
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Container = styled.div`
  background-color: #fafaf3;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  ${tw`
  items-center justify-center 
  `}
`;

const CharacterContainer = styled.div`
  ${tw`
  flex items-center justify-center py-4 flex-wrap  
  `}
  & > p {
    padding: 30px 0;
  }
`;

const CharacterBox = styled.div`
  width: 70vw;
  ${tw`
  grid grid-cols-4 gap-4
  `};
`;

const Title = styled.h2`
  ${tw`text-2xl font-bold tracking-tight`}
  color: rgb(114, 114, 114);
  text-align: left;
`;

const TitleBox = styled.div`
padding-bottom: 13px;
border-bottom: 1px solid #727272;
`;
const Line = styled.hr`
  border: 0px;
  border-top: 1px solid rgb(114, 114, 114);
  margin-left: 20px;
  margin-right: 20px;
  ${tw`
  mt-3 mb-12
  `}
`;

const Image = styled.img`
  position: relative;
  object-fit: cover;
  ${tw`
  h-full w-full rounded-lg  
  `}
`;

const StarImage = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;
const StarButton = styled.button`
  display: none;
`;

const NftInfo = styled.p`
  display: none;
  position: absolute;
  bottom: 10px;
  z-index: 10;
  ${tw`
  text-sm font-bold tracking-tight
  `}
`;

const NftBox = styled.div`
  position: relative;
  background-color: rgb(217, 217, 217);
  ${tw`
    rounded-xl 
    flex items-center justify-center
  `};
  &:hover {
    ${Image} {
      filter: grayscale(100%);
    }
    ${StarButton} {
      display: block;
    }
    ${NftInfo} {
      display: block;
    }
  }
`;

export default CharacterList;
