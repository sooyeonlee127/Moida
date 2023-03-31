import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'
import Paging from "./Paging";


//혜수: 사용자 리뷰 전체 조회
const ReviewList = () => {
  const [card, setCard] = useState([]); //리스트에 나타낼 아이템들
  const [cardsLength, setCardsLength] = useState(0); // 전체 데이터 갯수 저장(페이지네이션) - 이은혁

  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(10); // 한 페이지에 보여줄 아이템 수 

  const [indexOfLastPost, setIndexOfLastPost] = useState(0); //현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); //현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState([]); //현재 페이지에서 보여지는 아이템들

  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  const [selected1, setSelected1] = useState("ALL");

  const sort = ["LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"]
  const [selected2, setSelected2] = useState("LATEST");

 
  const getReviews = async(category, sort) => {
    try {
      console.log(category, sort)
      const res = await axios({
        url: "/api/article",
        method: "GET",
        params: {
          pageNumber: currentPage, // 요청할 페이지 넘버
          pageSize: postPerPage, //몇개씩 불러올건지
          category: category,
          sort: sort
        },
        headers: {
          accept: "*/*"
        }
      })
      if(res){
        setCard(res.data.articleList);
        setCardsLength(res.data.length); //전체 데이터 개수 받아옴
        setIndexOfLastPost(currentPage * postPerPage);

      }
    } catch(err) {
      console.log(err)
    }
  }

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getReviews(selected1, selected2)
  }, [selected1, selected2, currentPage])


  return (
    <div>
       {/* 셀렉트박스 */}
        {/* 카테고리 */}
        <div>
          <select onChange={(e)=>setSelected1(e.target.value)}>
            {category.map((element,index) => (
              <option key={index}>{element}</option>
            ))}
          </select>

        </div>
        {/* 정렬 */}
        <div>
          <select onChange={(e)=> setSelected2(e.target.value)}>
            {sort.map((element,index) => (
              <option key={index}>{element}</option>
            ))}
            </select>
        </div>

      {/* 유저후기 */}
      <Title>Gallery</Title>
      <div>
        {
          card?.map((element,index) => {
            return (
              <ReviewCard review={element} index={index} key={index} />
            )
          })
        }
      </div>

      {/* 페이지네이션 */}
      <Paging
        page={currentPage}
        count={cardsLength}
        setPage={setPage} />

      

      

    </div>
  )
}

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`





export default ReviewList;

