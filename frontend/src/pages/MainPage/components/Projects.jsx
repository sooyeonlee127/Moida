import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import "../main.css";
import { useEffect } from "react";
import { useState } from "react";

const Projects = (props) => {
  const navigate = useNavigate();
  const { ref: target, inView, isShown } = useScroll();
  const { id, projectReqDto, donationResDto } = props.card;
  const clickCard = (routePath) => {
    navigate("/donation/" + routePath, { replace: false });
  };

  const [value, setValue] = useState();
  const handleScroll = () => {
    setValue(parseInt(window.scrollY));
    // console.log(value);
  };
  useEffect(() => {
    // console.log(target.current.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="project">
      <StickyContainer ref={target}>
        <Sticky id={"card_" + id} className={isShown ? "card show" : "card"}>
          <Heading>{projectReqDto.subject}</Heading>
          <Text>{projectReqDto.description}</Text>
          {/* <p>{value}</p> */}
          <Button onClick={() => clickCard(id)}>참여하기</Button>
          {/* <div style={{ marginTop: `${inView2 && value- target2.current?.offsetTop}px` }}>ddd</div> */}
          <div>
            {inView && value - target.current?.offsetTop}
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
  top: 56px;
`;
const Heading = styled.h2`
  ${tw`
  text-3xl font-bold tracking-tight text-black sm:text-4xl
`}
`;

const Text = styled.p`
  ${tw`
  mt-6 text-lg leading-8 text-gray-300
`}
`;

const Button = styled.button`
  ${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
`;

export default Projects;
