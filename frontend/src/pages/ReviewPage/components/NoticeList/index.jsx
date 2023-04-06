import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import 다람쥐영상 from "../../../../assets/videos/다람쥐영상.mp4";
import 흑두루미영상 from "../../../../assets/videos/흑두루미영상.mp4";
import 토끼영상 from "../../../../assets/videos/토끼영상.mp4";
import 흑두루미사진 from "../../../../assets/img/wheat.png";
import 토끼사진 from "../../../../assets/img/corn.png";
import 다람쥐사진 from "../../../../assets/img/acorn.png";

const NoticeList = () => {
  const noticeList = [
    {
      title: "흑두루미",
      shortDesc: "짧은 소개글",
      videoUrl: 흑두루미영상,
      imgUrl: 흑두루미사진,
      category: "CRANE",
    },
    {
      title: "다람쥐",
      shortDesc: "짧은 소개글",
      videoUrl: 다람쥐영상,
      imgUrl: 다람쥐사진,
      category: "SQUIRREL",
    },
    {
      title: "야생동물",
      shortDesc: "짧은 소개글",
      videoUrl: 토끼영상,
      imgUrl: 토끼사진,
      category: "WILD_ANIMAL",
    },
  ];

  return (
    <div>
      <Title>Notice</Title>
      <H4>기부한 모이를 어떻게 사용했는지 알 수 있어요</H4>
      <Wrapper>
        {noticeList.map((notice, index) => {
          return (
            <Link to={"/notice/" + notice.category} key={index}>
              <Video>
                <div style={{ position: "relative" }}>
                  <video
                    width="325"
                    muted
                    loop
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                  >
                    <source src={notice.videoUrl} type="video/mp4"></source>
                  </video>
                  <Image src={notice.imgUrl} alt="" />
                </div>
              </Video>
            </Link>
          );
        })}
      </Wrapper>
    </div>
  );
};

const Title = styled.h2`
  ${tw`text-2xl font-bold tracking-tight text-gray-900`}
  text-align: left;
  margin-left: 10px;
`;

const H4 = styled.h4`
  text-align: left;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5px;
`;
const Image = styled.img`
  object-fit: contain;
`;

const Video = styled.div`
  ${Image} {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transition: 0.2s;
    background-color: rgb(225, 237, 213);
    width: 325px;
    height: 100%;
    padding: 40px;
  }

  &:hover ${Image} {
    opacity: 0;
    z-index: -1;
  }
`;

export default NoticeList;
