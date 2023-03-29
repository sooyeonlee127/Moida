// 리뷰상세페이지. aka 카드
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

//혜수: 리뷰 상세 페이지 조회
const ReviewDetailPage = () => {
  const { reviewid } = useParams(); // const 변수명 = useParams().파라미터명;
  let [review, setReview] = useState([]);

  useEffect(() => {
    axios({
      url: "/api/article/"+reviewid,
      method: "GET"
    })
    .then((res) => {
      console.log(res);
      setReview(res.data)

    })
    .catch((error) => {
      console.log(error);
    })
  },[])
  

  const navigate = useNavigate();
  const onClickUd = () => {
    navigate(`/review/update/${reviewid}`)
  }


  return (
    <>
    <Box></Box>
    {reviewid}번 리뷰 페이지 입니다

    {/* 캐러셀 */}
    {/* <Div id="default-carousel" data-carousel="slide">
        <div className="Carouselwrapper"> */}
          {/* Item */}
            {/* <div data-carousel-item className="Carouselwrapper">
                <Img src={review.url} />
            </div> */}
            {/* <div data-carousel-item className="Carouselwrapper">
                <Img src="https://images.mypetlife.co.kr/content/uploads/2019/10/09152625/andre-ouellet-P-zN6GfHv8M-unsplash-1536x1024.jpg" />
            </div>
            <div data-carousel-item className="Carouselwrapper">
                <Img src="https://www.wonju.go.kr/DATA/bbs/136/202107031124275530E98BA2B1AGF23G0.jpg" />
            </div>
            <div data-carousel-item className="Carouselwrapper">
                <Img src="https://www.wonju.go.kr/DATA/bbs/136/202107031124275466AEAEDB644417BBG.jpg" />
            </div>
            <div data-carousel-item className="Carouselwrapper">
                <Img src="https://www.wonju.go.kr/DATA/bbs/136/202107031124275530E98BA2B1AGF23G0.jpg" />
            </div> */}
        {/* </div> */}
        {/* <!-- SliderIndicators --> */}
        {/* <div className="SliderIndicators">
            <Button type="button" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></Button>
            <Button type="button" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></Button>
            <Button type="button" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></Button>
            <Button type="button" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></Button>
            <Button type="button" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></Button>
        </div> */}
        {/* <!-- SliderControls --> */}
        {/* <button type="button" className="SliderControlsLeft" data-carousel-prev>
            <Span >
                <Astyle aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></Astyle>
                <span className="Astyle">Previous</span>
            </Span>
        </button>
        <button type="button" className="SliderControlsRight" data-carousel-next>
            <Span>
                <Astyle aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></Astyle>
                <span className="Astyle">Next</span>
            </Span>
        </button>
    </Div> */}

    <MainDiv>
      <div>
      <ReviewImg src={review.url} alt=""></ReviewImg>
      </div>
      <h4>{review.description}</h4>
      
      
      
      <h4>{review.difficultyLevel}</h4>
      <h4>{review.subject}</h4>
      <h4>{review.regDate}</h4>
      

      <ButtonWrapper>
        <Button type="button" onClick={onClickUd}>수정</Button>
        <Button type="button">삭제</Button>
      </ButtonWrapper>
    </MainDiv>


    </>
  )
}



const Box = styled.div`
${tw`h-16`}
`

const Div = styled.div`
${tw`relative w-full`}
  
&.Carouselwrapper{
  ${tw`relative h-56 overflow-hidden rounded-lg md:h-96`}
}

&.Item {
  ${tw`hidden duration-700 ease-in-out`}
}

&.SliderIndicators {
  ${tw`absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2`}
}

&.SliderControlsLeft {
  ${tw`absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none`}
}

&.SliderControlsRight{
  ${tw`absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none`}
}

`

const Img = styled.img`
${tw`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
`


const Span = styled.span`
${tw`inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none`}
  .Astyle ${tw`sr-only`}
`


const Button = styled.button`
${tw`w-3 h-3 rounded-full`}`

const Astyle = styled.svg`
${tw`w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800`}

`

const MainDiv = styled.div`
display: flex;
flex-direction : column;
`

const ReviewImg = styled.img`
opacity: 0.8;
display : block
`

const ButtonWrapper = styled.div`
flex-direction : row;

`

export default ReviewDetailPage;