// 리뷰상세페이지. aka 카드
import { useState } from "react"
import Review from "./review"
import { useParams } from "react-router-dom";

const ReviewCard = () => {
  const { reviewid } = useParams(); // const 변수명 = useParams().파라미터명;
  // let [review, SetReview] = useState(Review);
  return (
    <>
      {reviewid}번 리뷰 페이지 입니다
    </>
  )
}

export default ReviewCard;