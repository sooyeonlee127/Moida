// 리뷰 리스트
import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'
import Review from "../../../ReviewDetailPage/review"


const ReviewList = () => {
  let [review, SetReview] = useState(Review);
  let [card, setCard] = useState([]);

  useEffect(() => {
    //전체 인증갤러리 조회
    axios({
      url: "/api/article",
      method: "GET",
    })
    .then((res) => {
      // console.log(res);
      setCard(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  

  return (
    <Div className="Wrapper">
      <Div className="SubWrapper">
        {/* 유저후기 */}
        <Title>Gallery</Title>
        <Div className="ReviewWrapper">
        {
          card?.map((element,index) => {
            return (
              <ReviewCard review={element} index={index} key={index}/>
            )
          })
        }
        </Div>
      </Div>

      
<nav aria-label="Page navigation example">
  <Ul>
    <li>
      <Pagination1>
        <span className="sr-only">이전</span>
        {/* <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> */}
      </Pagination1>
    </li>
    <li>
      <A aria-current="page" className="active">1</A>
    </li>
    <li>
      <A className="active">2</A>
    </li>
    <li>
      <A  className="active">3</A>
    </li>
    <li>
      <A className="active">4</A>
    </li>
    <li>
      <A className="active">5</A>
    </li>
    <li>
      <Pagination2>
        <span className="sr-only">다음</span>
        {/* <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> */}
      </Pagination2>
    </li>
  </Ul>
</nav>

    </Div>
  )
}






const Div = styled.div`
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

const Span = styled.span`
${tw`sr-only`}`


const A = styled.a`
${tw`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
  &.active {
    ${tw`block ml-0 rounded-l-lg `}
  }
`

const Pagination1 = styled.a`
${tw`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`

const Pagination2 = styled.a`
${tw`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
`

const Ul = styled.ul`
${tw`inline-flex items-center -space-x-px`}`



export default ReviewList;

