import styled from "styled-components";
import tw from "twin.macro";
import NoticeCard from "./NoticeCard"

const NoticeList = () => {
    const noticeList = [
      {
        title: "흑두루미",
        shortDesc: "짧은 소개글",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Grus_monacha1.jpg",
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
        imgUrl: "https://cdn.newspenguin.com/news/photo/202210/12605_38445_633.jpeg",
        category: "WILD_ANIMAL"
      }
    ]
    return (
        <div>
          <Title>Notice</Title>
          {/* <div>
            <img src="src\assets\img\free-icon-badger-3819407.png" alt="" />
          </div> */}

  
          <Wrapper>
          {
            noticeList.map((notice, index) => {
              return (
                <NoticeCard title={notice.title} shortDesc={notice.shortDesc} category={notice.category} imgUrl={notice.imgUrl} key={index}/>
              )
            })
          }
          </Wrapper>
      </div>
    )
}

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const Wrapper = styled.div`
display: flex;
flex-direction: row;
`

export default NoticeList;