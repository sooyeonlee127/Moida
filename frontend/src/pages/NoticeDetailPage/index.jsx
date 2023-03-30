// 공지사항. notice. 추후 PDF viewer로 연결. 
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import { useEffect } from "react";


const NoticeDetailPage = () => {
  const { category } = useParams(); // const 변수명 = useParams().파라미터명;
  console.log(category)

  const [data, setData] = useState({})
  const getNotice = () => {
    return axios({
        url: "/api/article/board/category/"+category,
        method: "GET",
        headers: {
          accept: "*/*"
        }
      })
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((err) => {
      console.log(err)
    })
  }

  
  useEffect(()=> {
    getNotice()
  }, [])

  // {
  //   "generationList": [
  //     {
  //       "id": 0,
  //       "generation": 0
  //     }
  //   ],
  //   "getBoardDetailResDto": {
  //     "id": 0,
  //     "subject": "string",
  //     "description": "string",
  //     "adminNickname": "string",
  //     "regDate": "2023-03-30T06:25:04.683Z",
  //     "fileList": [
  //       "string"
  //     ],
  //     "projectId": 0
  //   }
  // }
  return (
    <Wrapper>
      {category}번 공지 페이지 입니다
      {data.generationList?.map((a, index) => {return (<p key={index}>{a.id}</p>)})}
      <p>{data.getBoardDetailResDto?.subject}</p>
      <p>{data.getBoardDetailResDto?.description}</p>
      <p>{data.getBoardDetailResDto?.adminNickname}</p>
      <p>{data.getBoardDetailResDto?.regDate}</p>
      <p>{data.getBoardDetailResDto?.fileList}</p>
      <p>{data.getBoardDetailResDto?.projectId}</p>
      <label htmlFor="generation">차수 선택</label>
      <select name="generation" id="generation">
        {
          data.generationList?.map((option, index) => {
            return(
              <option key={index} value={option?.id}>{option.generation}차</option>
            )
          })
        }
      </select>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100%;
padding-top: 56px;
`

export default NoticeDetailPage;
