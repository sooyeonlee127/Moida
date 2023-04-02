import { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import ReviewCard from './ReviewCard'
import Paging from "../../../../components/Pagination/Paging";


//혜수: 사용자 리뷰 전체 조회
const ReviewList = () => {
  const [data, setData] = useState([]); //리스트에 나타낼 아이템들
  const [length, setLength] = useState(0); // 전체 데이터 갯수 저장(페이지네이션) - 이은혁
  const [pageNum, setPageNum] = useState(1); //현재 페이지
  const [pageSize, setPageSize] = useState(10); // 한 페이지에 보여줄 아이템 수 
  const [selected1, setSelected1] = useState("ALL");
  const [selected2, setSelected2] = useState("LATEST");
  const category = ["ALL", "흑두루미", "다람쥐", "야생동물"];
  const sort = ["LATEST", "DIFFICULTY_HIGHEST", "DIFFICULTY_LOWEST"]

  const getReviews = async(category, sort) => {
    try {
      console.log(category, sort)
      const res = await axios({
        url: "/api/article",
        method: "GET",
        params: {
          pageNumber: pageNum, // 요청할 페이지 넘버
          pageSize: pageSize, //몇개씩 불러올건지
          category: category,
          sort: sort
        },
        headers: {
          accept: "*/*"
        }
      })
      if(res){
        setData(res.data.articleList);
        setLength(res.data.length); //전체 데이터 개수 받아옴
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviews(selected1, selected2)
  }, [selected1, selected2, pageNum])


  return (
    <div>
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
          data?.map((element,index) => {
            return (
              <ReviewCard review={element} index={index} key={index} />
            )
          })
        }
      </div>
      <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/> 

    </div>
  )
}

const Title = styled.h2`
${tw`text-2xl font-bold tracking-tight text-gray-900`}`





export default ReviewList;

