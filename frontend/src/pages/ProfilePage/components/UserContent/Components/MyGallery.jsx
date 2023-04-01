import React, { useState, useEffect } from 'react'
import useListApi from "./api"
import styled from 'styled-components';

const MyGallery = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
  const { data: datas, length, error, loading } = useListApi("volunteer-article", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
  const Pagenation = () => {
      const lastPage = parseInt((length+5)/pageSize)
      const tmp = []
      for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
          tmp.push(i)
      }
      setPageList(tmp)
  }
  useEffect(() => {
    Pagenation()
  }, [length])
  return (
    <>

              {datas.map((data, index) => { 
                    return (
                        <div key={index}>
                            <p>프로젝트 분류 : {data.category}</p>
                            <p>난이도 : {data.difficultyLevel}</p>
                            <p>제목 : {data.subject}</p>
                            <p>작성일시 : {data.regDate}</p>
                            <p>내용 : {data.description}</p>
                        </div>
                    )
                })}

        <p> 
          {datas.length === 0 && !loading? "빈 값":""}
          {loading? "로딩 중":""}
          {pageList?.map((num, index)=>{ return (<PageBtn onClick={()=> setPageNum(num)}>{num}</PageBtn>) })}
        </p>
        
    </>
  )
}

const PageBtn = styled.button`
margin: 0 10px;
padding: 5px 10px;
border: 1px solid black;
background-color: red;
`

export default MyGallery;