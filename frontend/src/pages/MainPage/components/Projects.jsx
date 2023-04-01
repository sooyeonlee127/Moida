import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import useScroll from "./useScroll";
import "../main.css";
import { useEffect } from "react";
import { useState } from "react";

const nav_height = "52px"; // 네브바 높이 조정 - 이은혁

const Projects = (props) => {
  const { id, projectReqDto, donationResDto } = props.card; // props 데이터 - 이은혁
  const index = props.index; // props 데이터 - 이은혁


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
    setScrollY(parseInt(value))
    document.body.style.setProperty("--scroll", value/1000);
  }

  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll)
  //   };
  // }, []);
  

  useEffect(() => {
    if (inView){
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [inView]);



  return (
    <StickyContainer ref={target}>
      <Sticky id={"card_" + index} className={isShown ? "page card show" : "page card"}>
        <div className="inner_page">
          <Image src="" alt=""/>
          <Subject>{projectReqDto.subject}</Subject>
          <Content>
            <p id="desc">{projectReqDto.description}</p>
            {/* <p>모이 1개당 {projectReqDto.pointPerMoi} point</p> */}
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", alignItems: "flex-end"}}>
              <div style={{display: "inline-block"}}>
                <p id="amount">현재 {donationResDto.amount} 개</p>
                <p id="target_amount">목표 {donationResDto.targetAmount} 개</p>
              </div>
              <div style={{display: "inline-block"}}>
                <Button>참여하기</Button>
              </div>
            </div>
            {/* <p>{new Date(donationResDto.endDate).getFullYear()}년 ~ {donationResDto.startDate}</p> */}
            {/* <p>{donationResDto.subject}</p> */}
          </Content>
          <div>
            {/* {()=> {return (<Button onClick={() => clickCard(id)} style={}>참여하기</Button>)} } */}
            {/* {inView && scrollY - target.current?.offsetTop}
            {inView ? "true" : "false"} */}
          </div>
        </div>
      </Sticky>
    </StickyContainer>
  );
};

const StickyContainer = styled.div`
  height: 2000px;
  width: 100%;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: ${nav_height}px;
`;

const Image = styled.img`
  width: 100vh;
  height: 300px;
  background: red;
`

const Subject = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #83BD00;
`;

const Content = styled.div`
  width: 100%;
  text-align: left;
  & #desc {
    font-size: 1rem;
    color: #505050;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  & #amount {
    font-size: 1.4rem;
    font-weight: 900;
    color: #594949;
  }
  & #target_amount {
    font-size: 1.4rem;
    font-weight: 900;
    color: #6A6A6A;
  }
`

const Button = styled.button`
  padding: 10px 40px;
  background-color: #8BDF35;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  box-shadow: 0 5px 10px #00000040;

  &:hover {
    background-color: #9aea47;
  }
  &:active {
    background-color: #85d236;
  }
`
export default Projects;




// projectReqDto
  // category: "WILD_ANIMAL"
  // description: "옥수수는 많은 야생동물에게 도움이 됩니다~"
  // pointPerMoi: 800
  // subject: "야생동물에게 옥수수를 선물해주세요"

// donationResDto
  // amount: 464800
  // description: "프로젝트 기부 상세 설명~~"
  // endDate: "2023-03-27T23:59:59.999999"
  // id: 1
  // startDate: "2023-03-24T00:00"
  // subject: "프로젝트 기부 소제목"
  // targetAmount: 3500000