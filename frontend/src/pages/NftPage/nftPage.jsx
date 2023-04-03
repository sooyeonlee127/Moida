import styled from "styled-components";
import tw from "twin.macro";
import ResultModal from "./components/ResultModal";
import Web3 from "web3";
import { useState, useEffect, useCallback, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../lib/connectors";
import { create as ipfsHttpClient } from "ipfs-http-client";
import COMMON_ABI from "../../common/ABI";
import axios from "axios";

// const ipfs = ipfsHttpClient({ host: "ipfsnode", port: 5001, protocol: "http" });
const ipfs = create({
  url: "http://j8c2071.p.ssafy.io/api/v0",
});

const NftPage = () => {
  // [변수] 아이템 (파일, 이름, input 클릭 참조), 작가명, 제목, 아이템 소개, 토큰 ID
  const [item, setItem] = useState("");
  const [itemName, setItemName] = useState("");
  const itemSelect = useRef();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [imageIPFSUrl, setImageIPFSUrl] = useState("");
  const [metaIPFSUrl, setMetaIPFSUrl] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [imgId, setImgId] = useState("");
  // const nickname = localStorage.getItem("nickname");
  const nickname = "babo";
  //const userId = localStorage.getItem("id");
  const id = "1";

  // const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
  const web3 = new Web3(process.env.REACT_APP_SEPOLIA_API_URL);
  const web3Eth = new Web3(window.ethereum);

  const {
    connector,
    library,
    chainId, // DApp에 연결된 account의 chainId
    account, // DApp에 연결된 account address
    active, // DApp 유저가 로그인 된 상태인지 체크
    activate, // DApp 월렛 연결 기능 수행함수
    deactivate, // DApp 월렛 해제 수행함수
  } = useWeb3React();

  const [done, setDone] = useState(false);
  const nftData = {};

  const connectWallet = useCallback(async () => {
    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        // todo

        await activate(injected);
        console.log("메타마스크 연결");

        // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const unconnectWallet = async () => {
    try {
      // 메타마스크 설치 된 경우
      if (typeof window.ethereum !== "undefined") {
        if (active) {
          deactivate(injected);
          console.log("메타마스크 연결 해제");
        }

        // 메타마스크 설치 안된 경우
      } else {
        alert("please install MetaMask");
        window.open("https://metamask.io/download.html");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    // 사용자 지갑주소
    console.log(account);

    // 파일(이미지) 업로드
    const ipfsImg = await ipfs.add(file);
    const ipfsImgUrl = `https://ipfs.io/ipfs/${ipfsImg.path}`;
    console.log("원본", ipfsImgUrl);
    setImageIPFSUrl(ipfsImgUrl);

    // 메타데이터 업로드
    const metadata = {
      author: author,
      title: title,
      image: ipfsImgUrl,
    };
    console.log(metadata);
    const ipfsMeta = await ipfs.add(JSON.stringify(metadata));
    const ipfsMetaUrl = `https://ipfs.io/ipfs/${ipfsMeta.path}`;
    setMetaIPFSUrl(ipfsMetaUrl);
    console.log("ipfsMetaUrl : ", metaIPFSUrl);

    // 스마트 컨트랙트 인스턴스 생성
    const nftContract = new web3.eth.Contract(
      // ABI
      COMMON_ABI.CONTRACT_ABI.NFT_ABI,
      // Contract Address
      "0x9796b4bfD85FCA4837f24B12f565C25ec00842f3"
    );

    console.log("스마트 컨트랙트 인스턴스 생성");

    // 스마트 컨트랙트로 NFT 민팅 (to주소, 데이터)
    const sendData = nftContract.methods.create(account, ipfsMetaUrl).send({ from: account });
    console.log(sendData);

    // NFT 저장 요청하기
    console.log("저장요청");
    // saveNftInfo();
  };

  const getNftInfo = async () => {
    axios({
      url: "/api/nft/image?userNickname=" + nickname,
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setFile(res.data.imgFile);
        setAuthor(nickname);
        setTitle(res.data.ntfName);
        setImgId(res.data.imgId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveNftInfo = async () => {
    console.log("유저 아이디, 이미지 아이디, nft 이름, 메타데이터 주소, 이미지 주소");
    console.log("metaUrl : " + metaIPFSUrl);
    axios({
      url: "/api/nft",
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
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (imageIPFSUrl && imageIPFSUrl && done === false) {
      setDone(true);
      saveNftInfo();
      console.log("실행");
    }
  }, [metaIPFSUrl]);

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    setFile(file);
  }

  async function fetchRandomImage() {
    try {
      //const response = await axios.get('/nft/randomImg');
      //const imageUrl = response.data;
      const imageUrl =
        "https://s3.ap-northeast-2.amazonaws.com/moida.bucket/static/article/e17365b6-2fd9-4f77-8fe5-2e3a79a7ef9b";
      console.log(imageUrl);

      // 이미지 다운로드
      const imageResponse = await axios.get(imageUrl, { responseType: "blob" });
      console.log(imageResponse);
      const imageBlob = imageResponse.data;
      const image = URL.createObjectURL(imageBlob);

      setImg(image);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box></Box>
      <div>
        <div className="Meta">
          <button onClick={connectWallet}>연결확인</button>
        </div>
        <div className="Meta">
          <button onClick={getNftInfo}>NFT 정보 가져오기</button>
        </div>
        <div className="Meta">
          <button onClick={addItem}>NFT 생성</button>
        </div>
        <div className="Meta">
          <button onClick={fetchRandomImage}>S3 link to img</button>
          <div>{img ? <img src={img} alt="Random Image" /> : <p>Loading...</p>}</div>
        </div>
        {/* <div>
    <input type="file" onChange={handleFileInputChange} />
      <button onClick={addItem}>Upload</button>

      {ipfsUrl && (
        <div>
          <p>IPFS URL: {ipfsUrl}</p>
          <img src={ipfsUrl} alt="Uploaded" style={{ maxWidth: '500px' }} />
        </div>
      )}
    </div> */}
      </div>
    </>
  );
};

const Box = styled.div`
  ${tw`h-16`}
`;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-20 px-8
  `}
`;

const ButtonGroup = styled.div`
  ${tw`
  m-5
  flex items-center justify-between
  grid grid-cols-2 gap-4
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;

export default NftPage;
