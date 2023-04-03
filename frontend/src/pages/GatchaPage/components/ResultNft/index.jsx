import styled from "styled-components";
import tw from "twin.macro";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import COMMON_ABI from "../../../../common/ABI";
import api from "../../../../api/auth";
import { BlockContext } from "../../../../context/BlockChain";

const ResultNft = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [imageIPFSUrl, setImageIPFSUrl] = useState("");
  const [metaIPFSUrl, setMetaIPFSUrl] = useState("");
  const [file, setFile] = useState(null);
  const [imgId, setImgId] = useState("");
  const nickname = localStorage.getItem("nickname");
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const { nftCnt, setNftCnt } = useContext(BlockContext);

  const {
    account, // DApp에 연결된 account address
  } = useWeb3React();

  const [text, setText] = useState("?");

  const getNftInfo = async () => {
    api({
      url: "/nft/image",
      method: "GET",
    })
      .then((res) => {
        setFile(res.data.imgFile);
        setAuthor(nickname);
        setTitle(res.data.ntfName);
        setImgId(res.data.imgId);
      })
      .catch((error) => {
        console.log(error);
        setDone(true); // 뽑을 수 있는 티켓 없으면 버튼 일단 가려놓음
      });
  };

  const addItem = async () => {
    // 이미지 IPFS에 저장 후 해시값 가져와서 링크 저장
    const imgfile = {
      img: file,
    };
    const resImg = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: imgfile,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    });
    const ipfsImgUrl = `https://gateway.pinata.cloud/ipfs/${resImg.data.IpfsHash}`;
    setImageIPFSUrl(ipfsImgUrl);

    // 메타데이터 IPFS에 저장 후 해시값 가져와서 링크 저장
    const metadata = {
      author: author,
      title: title,
      img: ipfsImgUrl,
    };
    const res = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: metadata,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    });
    const ipfsMetaUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    setMetaIPFSUrl(ipfsMetaUrl);

    // 스마트 컨트랙트 인스턴스 생성
    const nftContract = new web3.eth.Contract(
      // ABI
      COMMON_ABI.CONTRACT_ABI.NFT_ABI,
      // Contract Address
      "0x9796b4bfD85FCA4837f24B12f565C25ec00842f3"
    );

    // 스마트 컨트랙트로 NFT 민팅 (to주소, 데이터)
    const sendData = nftContract.methods
      .create(account, ipfsMetaUrl)
      .send({ from: account });
  };

  // metaIPFSUrl 값에 변화가 생겼을 때 실행
  useEffect(() => {
    if (imageIPFSUrl && imageIPFSUrl && done === false) {
      setDone(true);
      saveNftInfo();
    }
  }, [metaIPFSUrl]);

  const saveNftInfo = async () => {
    api({
      url: "/nft",
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
      data: {
        imgId: imgId,
        nftName: title,
        metadataUrl: metaIPFSUrl,
        imgUrl: imageIPFSUrl,
      },
    })
      .then((res) => {
        setShow(true);
        setNftCnt(nftCnt + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNftInfo();
  }, []);

  return (
    <Page>
      <Container>
        <Box>
          {show ? (
            <ImageBox>
              <Image src={file} alt="" width="200" />
            </ImageBox>
          ) : (
            <Mark>{text}</Mark>
          )}
        </Box>
      </Container>
      <ButtonGroup>
        {done ? null : (
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addItem();
              setText("로딩중");
            }}
          >
            1회 뽑기
          </SubmitButton>
        )}
      </ButtonGroup>
    </Page>
  );
};

const Page = styled.div`
  background-color: #fafaf3;
  height: 89vh;
  width: 100vw;
`;

const Container = styled.div`
  ${tw`
  flex items-center justify-center 
  `}
`;

const Box = styled.div`
  height: 400px;
  width: 400px;
  background-color: rgb(225, 237, 213);
  ${tw`
  flex
  items-center justify-center
  `}
`;

const ButtonGroup = styled.div`
  justify-content: center;
  ${tw`
  flex
  `}
`;

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  ${tw` my-4 py-3 px-10 font-semibold text-black
  `};
`;

const Mark = styled.h1`
  ${tw`
  text-white
  text-9xl
  `}
`;
const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

export default ResultNft;
