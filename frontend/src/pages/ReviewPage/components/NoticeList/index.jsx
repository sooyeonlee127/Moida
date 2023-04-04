import styled from "styled-components";
import tw from "twin.macro";
import NoticeCard from "./NoticeCard"
import { Link } from "react-router-dom"

const NoticeList = () => {
    const noticeList = [
      {
        title: "흑두루미",
        shortDesc: "짧은 소개글",
        imgUrl: "https://species.nibr.go.kr/UPLOAD/digital/species/120000001652/BIMGAV0000376784_20211105162445204924.jpg",
        category: "CRANE"
      },
      {
        title: "다람쥐",
        shortDesc: "짧은 소개글",
        imgUrl: "https://www.wonju.go.kr/DATA/bbs/136/202107031124275466AEAEDB644417BBG.jpg",
        category: "SQUIRREL"
      },
      {
        title: "야생동물",
        shortDesc: "짧은 소개글",
        imgUrl: "https://2.bp.blogspot.com/-Eh8GlQ-IzA8/VtO7GnMR4pI/AAAAAAAAHMI/m4uLeNSqe-M/s640/IMG_8734.JPG",
        category: "WILD_ANIMAL"
      }
    ]
    return (
        <div>
          <Title>Notice</Title>
          <H4>기부한 모이를 어떻게 사용했는지 알 수 있어요</H4>
  
          <Wrapper>
          {
            noticeList.map((notice, index) => {
              return (
                <Link to={"/notice/"+notice.category} key={index}>
                    <Image src="" alt=""/>
                </Link>
              )
            })
          }

          </Wrapper>
      </div>
    )
}

const Title = styled.h2`
  ${tw`text-2xl font-bold tracking-tight text-gray-900`}
  text-align: left;
  margin-left: 10px;
`

const H4 = styled.h4`
  text-align: left;
  margin-left: 10px;
`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin-top : 5px;
`
const Image= styled.img`
height: 100px;
width: 300px;
margin: 0 10px;
display: block;
`
export default NoticeList;