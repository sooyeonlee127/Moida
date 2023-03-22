import { useState } from "react"
import styled from "styled-components";
import tw from "twin.macro";
import Notice from "../../../NoticeDetailPage/notice";

const NoticeList = () => {
    let [notice, setNotice] = useState(Notice);

    return (
        <Div className="Wrapper">
        <Div className="SubWrapper">
          {/* 기업후기 */}
          <Title>Notice</Title>
  
          <Div className="ReviewWrapper">
          {
            notice.map((element,index) => {
              return (
                <NoticeCard notice={notice[index]} index={index+1} key={index}/>
              )
            })
          }
          </Div>
        </Div>
      </Div>
    )
}

function NoticeCard(props) {
    return (
      <div>
        <a href={props.notice.href}>
        <img src={props.notice.imageSrc} alt={props.notice.imageAlt}/>
        <Div className="ReviewContent">
          <CardName>
              <h4>{props.notice.title}</h4>
          </CardName>
        <Div className="ReivewPrice">{props.notice.date}</Div>
        </Div>
        </a>
      </div>
    )
  }

const Div = styled.div`
.ReviewContent {
  ${tw`mt-2 flex justify-between`}
}

  .Wrapper {
    ${tw`mt-4 flex justify-between`}
  }

  .SubWrapper {
    ${tw`mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
  }

  .ReviewWrapper {
    ${tw`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8`}
  }

  .ReivewPrice {
    ${tw`text-sm font-medium text-gray-900`}
  }

  .ReviewColor {
    ${tw`mt-1 text-sm text-gray-500`}
  }


`

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const SpanTag = styled.span`
${tw`absolute inset-0`}`

const CardName= styled.h3`
${tw`text-lg text-gray-700`}`

export default NoticeList;