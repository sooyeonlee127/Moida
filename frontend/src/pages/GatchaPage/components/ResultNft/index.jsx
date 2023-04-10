import styled from "styled-components";
import tw from "twin.macro";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import COMMON_ABI from "../../../../common/ABI";
import api from "../../../../api/auth";
import { BlockContext } from "../../../../context/BlockChain";
import { useNavigate } from "react-router-dom";
import { injected } from "../../../../lib/connectors";
import gatcha from "../../../../assets/img/gatcha.svg";
import Modal from "../../../../components/Modal";
import loadingspinner from "../../../../assets/img/loadingspinner.svg";
import { AuthContext } from "../../../../context/Auth";
// import { useRef } from 'react'
// import { Runner, Engine, Render, Bodies, World } from 'matter-js'



// 수연: 가챠 뽑기
const ResultNft = () => {

  // const ref = useRef()
  // const engine = useRef(Engine.create())

  // useEffect(() => {
  //   const render = Render.create({
  //     element: ref.current,
  //     engine: engine.current,
  //     options: {
  //       width: 427,
  //       height: 230,
  //       wireframes: false,
  //       background: "transparent"
  //     }
  //   })
    
    // const leftwall = Bodies.rectangle(0, 0, 10, 100, { isStatic: true });
    // var rightwall = Bodies.rectangle(100, 0, 10, 100, { isStatic: true });
    // var ceiling = Bodies.rectangle(0, 0, 100, 10, { isStatic: true });
    // var ground = Bodies.rectangle(100, 100, 100, 10, { isStatic: true });
    // World.add(engine.current.world, [
    //   leftwall, rightwall, ceiling, ground
    // ])


    //----------------------------------
  //   World.add(engine.current.world, [
  //     Bodies.rectangle(200, 0, 427, 50, { isStatic: true }),
  //     Bodies.rectangle(200, 200, 427, 50, { isStatic: true }),
  //     Bodies.rectangle(427, 200, 50, 400, { isStatic: true }),
  //     Bodies.rectangle(0, 200, 50, 400, { isStatic: true })
  // ]);

  //   Runner.run(engine.current)
  //   Render.run(render)

  //   return () => {
  //     Render.stop(render)
  //     World.clear(engine.current.world)
  //     Engine.clear(engine.current)
  //     render.canvas.remove()
  //     render.canvas = null
  //     render.context = null
  //     render.textures = {}
  //   }
  // })
























  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [imageIPFSUrl, setImageIPFSUrl] = useState("");
  const [metaIPFSUrl, setMetaIPFSUrl] = useState("");
  const [file, setFile] = useState(null); // 뽑기 결과 파일
  const [imgId, setImgId] = useState("");
  const nickname = localStorage.getItem("nickname");
  const [done, setDone] = useState(true);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(false);
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const { nftCnt, setNftCnt } = useContext(BlockContext);
  const [text, setText] = useState("NFT를 뽑는 중입니다...");

  const {
    account, // DApp에 연결된 account address
    connector,
    activate,
  } = useWeb3React();

  const getNftInfo = async () => {
    api({
      url: "/nft/image",
      method: "GET",
    })
      .then((res) => {
        setDone(false); // 뽑을 수 있는 티켓 있으면 버튼 활성화
        setFile(res.data.imgFile);
        setAuthor(nickname);
        setTitle(res.data.ntfName);
        setImgId(res.data.imgId);
      })
      .catch((error) => {
        setDone(true); // 뽑을 수 있는 티켓 없으면 버튼 비활성화
        console.log(error);
      });
  };

  const addItem = async () => {
    if (!(account && connector)) {
      alert(
        "메타마스크가 연결되어있지 않습니다. 메타마스크 연결 페이지로 이동합니다."
      );
      navigate("/check", { replace: false });
    } else {
      setStart(true); // 뽑기 모달 띄우기
      await activate(injected);
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
    }
  };
  const { change, setChange } = useContext(AuthContext);

  const ClickExit = () => {
    setStart(false);
    setImageIPFSUrl("");
    setMetaIPFSUrl("");
    setText("NFT를 뽑는 중입니다...");
    setShow(false); // 로딩 초기화
    getNftInfo();
    setChange(change + 1)
  };

  // metaIPFSUrl 값에 변화가 생겼을 때 실행
  useEffect(() => {
    if (imageIPFSUrl && imageIPFSUrl && done === false) {
      saveNftInfo();
    }
  }, [metaIPFSUrl]);

  useEffect(() => {
    getNftInfo(); // 뽑을 NFT 불러옴
  }, []);

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
        setText("NFT를 획득했습니다!");
        setNftCnt(nftCnt + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Page>
      <Modal isOpen={start} title={text}>
        {show ? (
          <>
            <ImageBox>
              <Image src={file} alt="" width="200" />
            </ImageBox>
            <SubmitButton onClick={(e) => ClickExit()}>닫기</SubmitButton>
          </>
        ) : (
          <>
            <ImageBox>
              <Image src={loadingspinner} alt="" width="200" />
            </ImageBox>
          </>
        )}
      </Modal>
      <Container>
        <Box>
          <ImageBox>
            <Image src={gatcha} alt="" width="800" />
          </ImageBox>
        </Box>
      </Container>
      <ButtonGroup>
        {done ? null : (
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addItem();
            }}
          >
            티켓 1장 사용하기
          </SubmitButton>
        )}
      </ButtonGroup>
    </Page>
  );
};

const Page = styled.div`
  background-color: #fafaf3;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;

const Container = styled.div`
  ${tw`
  flex items-center justify-center
  `}
`;

const Box = styled.div`
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
  background-color: rgb(60, 197, 176);
  transition: 0.2s;
  ${tw` my-4 py-4 px-10 font-black text-white rounded tracking-tighter
  `};
  &:hover {
    background-color: rgb(79 211 190);
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.5);
  }
`;

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img`

`;

export default ResultNft;
