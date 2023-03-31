import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import "../main.css";
import { useEffect } from "react";
import { useState } from "react";

const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Projects = (props) => {
  // --------- 라우트 관련 - 이은혁
  const navigate = useNavigate();
  const clickCard = (routePath) => {
    navigate("/donation/" + routePath, { replace: false });
  };
  // -----------------------------

  // --- 스크롤 이벤트 관련 - 이은혁
  const { ref: target, inView, isShown } = useScroll();
  const [scrollY, setScrollY] = useState(); // scrollY: 스크롤량 저장

  const onScroll = () => {
    const value = window.scrollY
    setScrollY(value);
    // setScrollY(parseInt(value))
    document.body.style.setProperty("--scroll", value/1000);
  }
  
  useEffect(() => {
    if (inView){
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [inView]);
  // -----------------------------

  // -------------- props 정보 관련
  const { id, projectReqDto, donationResDto } = props.card;
  // -----------------------------

  return (
    <div className="project">
      <StickyContainer ref={target}>
        <Sticky id={"card_" + id} className={isShown ? "page card show" : "page card"}>
          <Heading>{projectReqDto.subject}</Heading>
          <Text>{projectReqDto.description}</Text>
          
          <div>
            {/* {()=> {return (<Button onClick={() => clickCard(id)} style={}>참여하기</Button>)} } */}
            {inView && scrollY - target.current?.offsetTop}
            {inView ? "true" : "false"}
          </div>
        </Sticky>
      </StickyContainer>
    </div>
  );
};

const StickyContainer = styled.div`
  height: 2000px;
  width: 100%;
  position: relative;
  background-color: lightgray;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
`;
const Heading = styled.h2`
  ${tw`text-3xl font-bold tracking-tight text-black sm:text-4xl`}
`;

const Text = styled.p`
  ${tw`mt-6 text-lg leading-8 text-gray-300`}
`;

const Button = styled.button`
  ${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
`;

export default Projects;
