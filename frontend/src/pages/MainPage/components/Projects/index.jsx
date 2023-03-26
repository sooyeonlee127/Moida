import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import useScroll from '../useScroll';
import "../../main.css"

const Projects = () => {
  const navigate = useNavigate();
  const { ref: target1, inView:isVisible1 } = useScroll();
  const { ref: target2, inView:isVisible2 } = useScroll();
  const { ref: target3, inView:isVisible3 } = useScroll();
  const cards = [
    {
      "id": 0,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리1",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: red;"
    },
    {
      "id": 1,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리2",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: green;"
    },
    {
      "id": 2,
      "projectReqDto": {
        "category": "CRANE",
        "subject": "다람쥐와 도토리3",
        "description": "다람쥐는 오늘도 도토리를 찾아 헤맵니다..."
      },
      "donationResDto": {
        "startDate": "2023-03-24",
        "endDate": "2023-03-27",
        "targetAmount": 1000000,
        "subject": "다람쥐에게 도토리를 주세요",
        "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 기부입니다",
        "id": 0,
        "amount": 0
      },
      "style": () => "background-color: blue;"
    }

  ];
  return (
    <div className="project">
      <StickyContainer ref={target1}>
        <Sticky id={"card_"+cards[0].id} className={isVisible1? "card show": "card"}>
          <Heading>{cards[0].projectReqDto.subject}</Heading>
          <Text>{cards[0].projectReqDto.description}</Text>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/donation/"+cards[0].id, { replace: false });
            }}
            >
            참여하기
          </Button>
        </Sticky>
      </StickyContainer>
      <StickyContainer ref={target2}>
        <Sticky id={"card_"+cards[1].id} className={isVisible2? "card show": "card"} ref={target2}>
          <Heading>{cards[1].projectReqDto.subject}</Heading>
          <Text>{cards[1].projectReqDto.description}</Text>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/donation/"+cards[1].id, { replace: false });
            }}
            >
            참여하기
          </Button>
        </Sticky>
      </StickyContainer>
      <StickyContainer ref={target3}>
        <Sticky id={"card_"+cards[2].id} className={isVisible3? "card show": "card"} ref={target3}>
          <Heading>{cards[2].projectReqDto.subject}</Heading>
          <Text>{cards[2].projectReqDto.description}</Text>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/donation/"+cards[2].id, { replace: false });
            }}
            >
            참여하기
          </Button>
        </Sticky>
      </StickyContainer>
  </div>
  )
};

const StickyContainer = styled.div`
height: 2000px;
width: 100%;
position: relative;
background-color: lightgray;
`

const Sticky = styled.div`
position: sticky;
top: 64px;
`
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
