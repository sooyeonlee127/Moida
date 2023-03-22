// 리뷰 리스트
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Review from "../ReviewDetailModal/review";

const ReviewList = () => {
  let [review,SetReview] = useState(Review);

  return (
    <Div className="Wrapper">
      <Div className="SubWrapper">
        {/* 기업후기 */}

        {/* 유저후기 */}
        <Gallery>Gallery</Gallery>

        <Div className="ReviewWrapper">
        {
          review.map((element,index) => {
            return (
              <ReviewCard review={review[index]} index={index+1}/>
            )
          })
        }
        </Div>
      </Div>
    </Div>
  )
}


function ReviewCard(props) {
  return (
    <div>
      <img src={props.review.imageSrc} alt={props.review.imageAlt}/>
      <Div className="ReviewContent">
        <ReviewName>
          <a href={props.review.href}>
            <SpanTag aria-hidden="true"/>
            <h4>{props.review.title}</h4>
          </a>
        </ReviewName>
      <Div className="ReivewPrice">{props.review.date}</Div>
      </Div>
    </div>
  )
}


const Div = styled.div`
.ReviewContent {
  ${tw`mt-4 flex justify-between`}
}

  .Wrapper {
    ${tw`mt-4 flex justify-between`}
  }

  .SubWrapper {
    ${tw`mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
  }

  .ReviewWrapper {
    ${tw`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`}
  }

  .ReivewPrice {
    ${tw`text-sm font-medium text-gray-900`}
  }

  .ReviewColor {
    ${tw`mt-1 text-sm text-gray-500`}
  }

`

const Gallery = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const SpanTag = styled.span`
${tw`absolute inset-0`}`

const ReviewName= styled.h3`
${tw`text-sm text-gray-700`}`

export default ReviewList;

