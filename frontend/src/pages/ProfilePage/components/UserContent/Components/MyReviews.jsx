import React, { useState, useEffect } from 'react'
import useListApi from "./api"
import styled from 'styled-components';
import Paging from '../../../../../components/Pagination/Paging'


const MyReviews = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
  const { data: datas, length, error, loading } = useListApi("volunteer-article", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
  
  // const Pagination = () => {
  //   const lastPage = parseInt((length+5)/pageSize) || 1 // 데이터 개수가 한 페이지 분량보다 작은경우에도 1이 뜨도록 처리 - 이은혁
  //   const tmp = []
  //   for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
  //     tmp.push(i)
  //   }
  //     setPageList(tmp)
  // }
  // useEffect(() => {
  //   Pagination()
  // }, [length])

  return (
    <div className='container'>
      <InnerContainer>
        {datas.map((data, index) => { 
              return (
                  <Review key={index}>
                      <p>프로젝트 분류 : {data.category}</p>
                      <p>난이도 : {data.difficultyLevel}</p>
                      <p>제목 : {data.subject}</p>
                      <p>작성일시 : {data.regDate}</p>
                      <p>내용 : {data.description}</p>
                  </Review>

              )
          })}
      </InnerContainer>
      <p>{datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>


        {/* {pageList?.map((num, index)=>{ return (<PageBtn key={index} onClick={()=> setPageNum(num)}>{num}</PageBtn>) })} */}

        <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/>
  </div>
  )
}
// const div = styled.div`
// width: 100%;
// min-height: 300px;
// border-top: 1px solid #838383;
// `
const InnerContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-wrap: wrap;

`
const Review = styled.div`
width: calc(25% - 10px);
margin: 5px;
height: 200px;
display: inline-block;
background: #f7f7f7;
border: 1px solid #ebebeb;
border-radius: 10px;
`

// const PageBtn = styled.button`
// margin: 0 10px;
// padding: 5px 10px;
// border: 1px solid black;
// background-color: red;
// `
export default MyReviews;