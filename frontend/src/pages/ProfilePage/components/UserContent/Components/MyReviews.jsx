import React, { useState, useEffect } from 'react'
import useListApi from "./api"
import styled from 'styled-components';
import Paging from '../../../../../components/Pagination/Paging'
import { useNavigate } from 'react-router-dom';
import 기본_이미지 from "../../../../../assets/img/기본_이미지.png"
 

const MyReviews = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data: datas, length, error, loading } = useListApi("volunteer-article", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
  const navigate = useNavigate()
  return (
    <div className='container'>

        {datas.map((data, index) => { 
          return (
              <>
              {/* <p>프로젝트 분류 : {data.category}</p>
              <p>난이도 : {data.difficultyLevel}</p>
              <p>제목 : {data.subject}</p>
            <p>사진 : {data.url}</p> */}
            <p>{datas.length === 0 && !loading? "빈 값":""}</p>
              <div className="item" key={index} style={{cursor: "pointer"}} onClick={()=>{navigate("/review/"+data.id)}}>
                    <div className="item_sec w-2">
                      <img src={data.url ? data.url : 기본_이미지}  className='preview_img' alt="" />
                    </div>
                    <div className="item_sec main_sec">
                      <p className='mb-1'>{data.subject}</p>
                      <p className='short_desc'>{data.description}</p>
                     </div>
                    <div className="item_sec w-1">
                      난이도 : {data.difficultyLevel}
                    </div>
                    <div className="item_sec w-2">
                      <p className='weak'>{data.regDate}</p>
                    </div>
              </div>
              </>
            )
          })}
    <p>{datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
    <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/>
  </div>
  )
}


// const PageBtn = styled.button`
// margin: 0 10px;
// padding: 5px 10px;
// border: 1px solid black;
// background-color: red;
// `
export default MyReviews;