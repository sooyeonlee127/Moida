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
const ipfs = ipfsHttpClient({
  url: "http://j8c2071.p.ssafy.io:5001/api/v0",
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
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(10); // 한 페이지에 보여줄 아이템 수 
  const [done, setDone] = useState(false);
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

  // 메타마스크 연결 여부 확인
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

  // 메타마스크 연결해제
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

  // nft 생성
  const addItem = async () => {
    // 사용자 지갑주소
    console.log(account);

    // 방법1 - pinata 활용
    const imgfile = {
      "img" : file
    }
    const resImg = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data: imgfile,
      headers: {
        'Authorization' : `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    });
    const ipfsImgUrl = `https://gateway.pinata.cloud/ipfs/${resImg.data.IpfsHash}`;
    setImageIPFSUrl(ipfsImgUrl);

    const metadata = {
      "author": author,
      "title": title,
      "img" : ipfsImgUrl
    };
    const res = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data: metadata,
      headers: {
        'Authorization' : `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    });
    const ipfsMetaUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    console.log(ipfsMetaUrl);
    setMetaIPFSUrl(ipfsMetaUrl);
    console.log("ipfsMetaUrl : ", metaIPFSUrl);

    // 스마트 컨트랙트 인스턴스 생성
    const nftContract = new web3.eth.Contract(
      // ABI
      COMMON_ABI.CONTRACT_ABI.NFT_ABI,
      // Contract Address
      "0x9796b4bfD85FCA4837f24B12f565C25ec00842f3"
    );

    // 스마트 컨트랙트로 NFT 민팅 (to주소, 데이터)
    const sendData = nftContract.methods.create(account, ipfsMetaUrl).send({ from: account });
    console.log(sendData);

    // NFT 저장 요청하기
    console.log("저장요청");

    // 방법2
    // // 파일(이미지) 업로드
    // const ipfsImg = await ipfs.add(file);
    // const ipfsImgUrl = `https://ipfs.io/ipfs/${ipfsImg.path}`;
    // console.log('원본',ipfsImgUrl);
    // setImageIPFSUrl(ipfsImgUrl);

    // // 메타데이터 업로드
    // const metadata = {
    //   author: author,
    //   title: title,
    //   image: ipfsImgUrl
    // };
    // console.log(metadata);
    // const ipfsMeta = await ipfs.add(JSON.stringify(metadata));
    // const ipfsMetaUrl = `https://ipfs.io/ipfs/${ipfsMeta.path}`
    // setMetaIPFSUrl(ipfsMetaUrl);
    // console.log("ipfsMetaUrl : ", metaIPFSUrl);

    // // 스마트 컨트랙트 인스턴스 생성
    // const nftContract = new web3.eth.Contract(
    //     // ABI
    //     COMMON_ABI.CONTRACT_ABI.NFT_ABI,
    //     // Contract Address
    //     "0xaFFDe73b03c463f9BdA428d5E3a3d48f8f2d9900",
    // );

    // console.log("스마트 컨트랙트 인스턴스 생성");

    // // 스마트 컨트랙트로 NFT 민팅 (to주소, 데이터)
    // const sendData = nftContract.methods.create(account, ipfsMetaUrl).send({ from: account });
    // console.log(sendData);

    // // NFT 저장 요청하기
    // console.log("저장요청");
    // // saveNftInfo();
  };

  // 랜덤 nft 이미지 가져오기
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

  // 사용자 nft 저장
  const saveNftInfo = async () => {
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
        // 짠하고 nft 출력 => file이 이미지 링크임!!
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

  // 사용자 nft 목록 가져오기
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
        console.log(res); // 데이터 뿌려주기
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 사용자 대표 nft 변경 => 클릭 이벤트로 id 가져오기
  const changeMainNft = async (id) => { // 카드 id 입력
    axios({
      url: "/api/users/me/image?nftId="+id,
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <button onClick={userNftList}>NFT 목록</button>
        </div>
        <div className="Meta">
          <button onClick={changeMainNft}>대표 nft 변경</button>
        </div>
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
