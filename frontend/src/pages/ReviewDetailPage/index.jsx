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


const Button = styled.button`
${tw`w-3 h-3 rounded-full`}`


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