import styled from "styled-components";
import useScroll from "./useScroll";
import { useEffect } from "react";
import { useState } from "react";
import rabbit from "../img/토끼.png"
import squirrel from "../img/다람쥐.png"
import crane from "../img/흑두루미.png"


const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Intro = () => {

  // --- 스크롤 이벤트 관련 - 이은혁
  const { ref: target, inView, isShown } = useScroll();
  const [scrollY, setScrollY] = useState(); // scrollY: 스크롤량 저장
  const onScroll = () => {
    const value = window.scrollY
    setScrollY(parseInt(value))
    document.body.style.setProperty("--scroll", value/1000);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll)
    };
  }, []);

  return (
      <StickyContainer ref={target} className="page_container">
        <Sticky className={inView ? "page show intro" : "page"}>
          <div className="inner_page intro">
            <InlineBox>
              <WrapCircle><Circle/><Circle/>
                <Circle className="wrap_animal">
                  <Img className="rabbit">
                    <img src={rabbit} alt="" />
                  </Img>
                </Circle>
              </WrapCircle>
              <WrapCircle><Circle/><Circle className="wrap_animal"><Img className="crane"><img src={crane} alt="" /></Img></Circle><Circle/></WrapCircle>
              <WrapCircle><Circle/><Circle/><Circle className="wrap_animal"><Img className="squirrel"><img src={squirrel} alt="" /></Img></Circle></WrapCircle>
            </InlineBox>
            <TextBox>
              <Text>
                <H2 className="animation_h2">LET’S WORK TOGETHER</H2>
                <H1 className="animation_h1">LOREM IPSUM<br/>DOLOR SIT</H1>
                <H3 className="animation_h3">
                  LOREM IPSUM DOLOR SIT AMET. CONSECTETUR ADIPIS ICING ELIT, <br/>
                  SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA <br/>
                  ALIQUA. UT ENIM AD MINIM VENIAM, QUIS.<br/>
                </H3>
              </Text>
              <Button>hello</Button>
            </TextBox>
          </div>
          <div>
            {/* {inView && scrollY - target.current?.offsetTop}
            {inView ? "true" : "false"} */}
          </div>
        </Sticky>
      </StickyContainer>
  );
};

const StickyContainer = styled.div`
  height: 1900px;
  width: 100%;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
  color: black;
`;

const WrapCircle = styled.div`
display: flex;
flex-direction: row;
`

const Circle = styled.div`
width: 125px;
height: 125px;
border-radius: 100px;
background-color: #E1EDD5;
margin: 10px;
`
const Img = styled.div`

`
const InlineBox = styled.div`
display: inline-block;
`
const TextBox = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-end;
`

const Text = styled.div`
text-align: right;
display: inline-block;
`

const H2 = styled.h2`
font-size: 2rem;
font-weight: 700;
margin-bottom: 0.5rem;
color: #584E3F;
`
const H1 = styled.h1`
font-size: 3.5rem;
font-weight: 900;
line-height: 3.5rem;
margin-bottom: 2rem;
color: #83BD00;
`
const H3 = styled.h3`
font-size: 0.7rem;
`

const Button = styled.button`
padding: 7px 45px;
border-radius: 5px;
background-color: #DC653F;
color: white;
&:hover {
  background-color: #f3825e;
}
&:active {
  background-color: #DC653F;
}
`
export default Intro;
