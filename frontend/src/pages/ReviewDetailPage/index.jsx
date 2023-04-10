// 리뷰상세페이지. aka 카드
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import api from "../../api/auth"
import "./index.css"
import DifficultyBar from "../../components/DifficultyBar";

//혜수: 리뷰 상세 페이지 조회
const ReviewDetailPage = () => {
  const { reviewid } = useParams(); // const 변수명 = useParams().파라미터명;
  const nickname = localStorage.getItem("nickname");
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true)
    axios({
      url: "/api/article/"+reviewid,
      method: "GET"
    })
    .then((res) => {
      setReview(res.data)
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false)
    })
  },[])
  

  const navigate = useNavigate();
  const onClickUd = () => {
    navigate(`/review/update/${reviewid}`)
  }

  const onClickDl = async () => {
    try {
      const confirmed = window.confirm("정말 삭제하시겠습니까?"); // 삭제하기 전에 묻는 Alert 창
      if (!confirmed) return; // 취소 버튼을 눌렀을 경우 함수 실행 중단

      const response = await api.delete(`/article/${reviewid}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
    });
      // console.log(response.data, '삭제되었습니다.');
      window.history.back()
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  // 날짜 형식 변경
  const date = new Date(review?.regDate);
  const year = String(date.getFullYear()).slice(0,4)
  const tmpM = String(date.getMonth()+1)
  const tmpD = String(date.getDate())
  const month = tmpM.length===1 ? "0"+tmpM : tmpM;
  const day = tmpD.length===1 ? "0"+tmpD : tmpD;


  return (
    <>
    <MainDiv>
      <Subdiv>
        <ReviewImg src={ !isLoading && review.url ? review.url : "" } alt=""></ReviewImg>
        <UpperBox>
          <Subject>{review.subject}</Subject>
          <WDate>{year+"."+month+"."+day}</WDate>
        </UpperBox>
        <Line></Line>
        <MidBox>
        
          <Difficulty>난이도 <DifficultyBar size="0.9rem" difficulty={review.difficultyLevel}/></Difficulty>
          <Writer>{review.writer}</Writer>
        </MidBox>
        <LastBox>
          <WDesciption>{review.description}</WDesciption>
        </LastBox>
      <ButtonWrapper>
        <div>
          <Button
          type="button"
          onClick={() => navigate(-1)}
          >목록</Button>
        </div>
        <div>
          {
            nickname === review.writer ? (
              <RightDiv>
                <Button2 type="button" onClick={onClickUd}>수정</Button2>
                <Button2 type="button" onClick={onClickDl}>삭제</Button2>
              </RightDiv>
              ) : ""
          }
        </div>
      </ButtonWrapper>
      </Subdiv>
    </MainDiv>

    </>
  )
}

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`
const Subdiv = styled.div`
  width: 100%;
  max-width: 700px;
  display:flex;
  flex-direction: column;
  align-items: center;
`

const ReviewImg = styled.img`
  display : block;
  border-radius : 15px;
`

const Subject = styled.h1`
  font-size: 150%
`

const UpperBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  margin : 20px 5px 10px 3px;
  font-weight: bold;

`

const WDate = styled.h4`
  color: rgb(120, 116, 116);
  font-weight: 100;
  font-size: 0.9rem;
`


const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: rgb(192, 192, 192);
  margin-bottom: 15px;
`

const MidBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const Difficulty = styled.h4`
  font-weight: 500;
`

const Writer = styled.h4`
  color: rgb(120, 116, 116);
  font-weight: 100;
  font-size: 0.9rem;
`
const LastBox = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 0 50px 0;
`

const WDesciption = styled.div`
  font-weight: 500;
  margin-right: 10px;
  `

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`
const RightDiv = styled.div`
  margin-left: auto;
`

const Button = styled.button`
  ${tw`w-3 h-3 rounded-full`}
  color: white;
  background-color: rgb(160, 200, 70);
  border-radius: 5px;
  width : 80px;
  height : 25px;
  `

const Button2 = styled.button`
  ${tw`w-3 h-3 rounded-full`}
  color: rgb(104 104 104);
  background-color: transparent;
  border: solid 2px rgb(207, 204, 204);
  border-radius: 5px;
  width : 80px;
  height : 25px;
  margin: 0 3px;
`

export default ReviewDetailPage;