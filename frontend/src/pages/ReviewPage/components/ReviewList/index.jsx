// 리뷰 리스트
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Review from "../../../ReviewDetailPage/review";

const ReviewList = () => {
  let [review, SetReview] = useState(Review);

  return (
    <Div className="Wrapper">
      <Div className="SubWrapper">
        {/* 유저후기 */}
        <Title>Gallery</Title>

        <Div className="ReviewWrapper">
        {
          review.map((element,index) => {
            return (
              <ReviewCard review={review[index]} index={index+1} key={index}/>
            )
          })
        }
        </Div>
      </Div>
    </Div>
  )
}


const ReviewCard = (props) => {
  return (
    <div className="group relative">
      <a href={props.review.href}>
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <Image src={props.review.imageSrc} alt={props.review.imageAlt}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <Div className="ReviewContent">
        <CardName>
          
            <h4>{props.review.title}</h4>
          
        </CardName>
        <PTag className="ReivewPrice">{props.review.date}</PTag>
      </Div>
      </a>
    </div>
  )
}

const Image = styled.img`
border-radius: 10px;
${tw`hover:ring`}
`

const Div = styled.div`
  .ReviewContent {
  ${tw`mt-4 flex justify-between`}
}

  .Wrapper {
    ${tw`bg-white`}
  }

  .SubWrapper {
    ${tw`mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
  }

  .ReviewWrapper {
    ${tw`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`}
  }

  .ReviewColor {
    ${tw`mt-1 text-sm text-gray-500`}
  }
  

`

const PTag = styled.p`
${tw`mt-1 text-sm text-gray-500`}`

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const SpanTag = styled.span`
${tw`absolute inset-0`}`

const CardName= styled.h3`
${tw`text-sm text-gray-700`}`

export default ReviewList;

