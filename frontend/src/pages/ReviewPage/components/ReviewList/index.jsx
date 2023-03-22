// 리뷰 리스트
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Review from "../ReviewDetailModal/review";

const ReviewList = () => {
  let [review,SetReview] = useState(Review);

  return (
    <Wrapper>
      <SubWrapper>
        <Gallery>Gallery</Gallery>

        <ReviewWrapper>
        {
          review.map((element,index) => {
            return (
              <ReviewCard review={review[index]} index={index+1}/>
            )
          })
        }
        </ReviewWrapper>


        {/* <ReviewWrapper>
          {review.map((review,index) => (
            <div key={review.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={review.imageSrc}
                  alt={review.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <ReviewContent>
                <div>
                  <ReviewName>
                    <a href={review.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {review.title}
                    </a>
                  </ReviewName>
                  <p className="mt-1 text-sm text-gray-500">{review.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{review.date}</p>
              </ReviewContent>
            </div>
          ))}
        </ReviewWrapper> */}


      </SubWrapper>
    </Wrapper>
  )
}


function ReviewCard(props) {
  return (
    <div>
      {/* <h4>{props.review.id}</h4> */}
      <img src={props.review.imageSrc} alt={props.review.imageAlt}/>
      <ReviewContent>
        <ReviewName>
          <a href={props.review.href}>
            <SpanTag aria-hidden="true"/>
            <h4>{props.review.title}</h4>
          </a>
        </ReviewName>
      <ReivewPrice>{props.review.date}</ReivewPrice>
      </ReviewContent>
      {/* <ReviewColor>{props.review.color}</ReviewColor> */}
    </div>
  )
}




const ReviewContent = styled.div`
${tw`mt-4 flex justify-between`}`

const Wrapper = styled.div`
${tw`bg-white`}`

const SubWrapper = styled.div`
${tw`mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}`

const Gallery = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`

const ReviewWrapper = styled.div`
${tw`mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`}`

const ReviewColor = styled.div`
${tw`mt-1 text-sm text-gray-500`}`

const ReivewPrice = styled.div`
${tw`text-sm font-medium text-gray-900`}`

const SpanTag = styled.span`
${tw`absolute inset-0`}`

const ReviewName= styled.h3`
${tw`text-sm text-gray-700`}`

export default ReviewList;


// 
//   export default function ReviewList() {
//     return <>
//     <Example/>
//         <Wrapper>
//         <SubWrapper>
//           <TitleText>
//             <h2>Gallery</h2>
//           </TitleText>
//           <PictureWrapper>
//             {Reviews.map((Review) => (
//                 <div key={Review.id}>
//                     <div>
//                         <img src={Review.imageSrc} alt={Review.imageAlt} />
//                         onC
//                     </div>
//                 </div>

//             ))}
//           </PictureWrapper>
//           </SubWrapper>
//         </Wrapper>
//         </>
//   }