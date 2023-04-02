import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useScroll from "./useScroll";
import nft1 from "../img/nft1.png"
import nft3 from "../img/nft2.png"
import nft2 from "../img/nft3.png"

const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Nft = () => {

    const { ref: target, inView, isShown } = useScroll();
    const [scrollY, setScrollY] = useState(); // scrollY: 스크롤량 저장
  
    const onScroll = () => {
      const value = window.scrollY
      setScrollY(parseInt(value))
      document.body.style.setProperty("--scroll", value/1000);
    }
  
    useEffect(() => {
      if (inView){
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
      }
    }, [inView]);
  
    return (
        <StickyContainer ref={target}>
            <Sticky className={isShown ? "page show" : "page"}>
                <div className="nft_page">
                  <Title>NFT GATCHA</Title>
                  <div className="nft_content">
                    <div className="wrap_nftbox">
                      <div className="outer_nftbox">
                        <div className="nftbox" id="nftbox_1"/>
                        <p className="nft_name">character 1.</p>
                        <p className="nft_desc">관련 프로젝트 설명 주절주절</p>
                      </div>
                      <div className="outer_nftbox">
                        <div className="nftbox" id="nftbox_2" />
                        <p className="nft_name">character 1.</p>
                        <p className="nft_desc">관련 프로젝트 설명 주절주절</p>
                      </div>
                      <div className="outer_nftbox">
                        <div className="nftbox" id="nftbox_3" />
                        <p className="nft_name">character 1.</p>
                        <p className="nft_desc">관련 프로젝트 설명 주절주절</p>
                      </div>
                    </div>
                    <div className="nft">
                      <img id="nft_1" src={nft1} alt="" />
                    </div>
                    <div className="nft">
                      <img id="nft_2" src={nft2} alt="" />
                    </div>
                    <div className="nft">
                      <img id="nft_3" src={nft3} alt="" />
                    </div>
                  </div>
                </div>
            </Sticky>
        </StickyContainer>
    )
}

const StickyContainer = styled.div`
  height: 2700px;
  width: 100%;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
  width: 100%;
  height: calc(100%)px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 40px;
  font-family: 'Holtwood One SC', serif;
  color: #414141;
}
`

export default Nft;