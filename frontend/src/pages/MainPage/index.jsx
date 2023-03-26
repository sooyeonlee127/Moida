import Projects from "./components/Projects";
import styled from "styled-components";
// import tw from "twin.macro";
import { useEffect, useRef } from "react";
import useScroll from './components/useScroll';
// import axios from "axios";



const MainPage = (props) => {
  // const getProjects = () => {
  //   axios({
  //     url: "/api/project",
  //     method: "GET",
  //   })
  //   .then(res => {
  //     console.log(res.response)
  //   })
  // }
  // getProjects()

  return (
    <Wrapper>
      <div className="intro"></div>
      <Projects />
      <div className="nft"></div>
      <div className="footer"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
width: 100vw;
position: absolute;
top: 64px;
left: 0;
`


export default MainPage;
