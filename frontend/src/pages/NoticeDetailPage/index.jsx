// 공지사항. notice. 추후 PDF viewer로 연결. 
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import { useEffect } from "react";


const NoticeDetailPage = () => {
  const { category } = useParams(); // const 변수명 = useParams().파라미터명;
  const [genList, setGenList] = useState([])
  // console.log("category: ", category)

  const [data, setData] = useState({})
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
  const getNotice = async () => {
    try {
      const res = await axios({
        url: "/api/article/board/category/"+category,
        method: "GET",
        headers: {
          accept: "*/*"
        }
      })
      if(res) {
        setData(res.data.getBoardDetailResDto)
        setGenList(res.data.generationList)
        // console.log(res.data.getBoardDetailResDto)
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    getNotice()
  }, [])

  const changeOpt = async (projectid) => {
    try {
      const res = await axios({
        url: "/api/article/board/"+projectid,
        method: "GET",
        headers: {
          accept: "*/*"
        }
      })
      // console.log(res.data)
      setData(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <Wrapper>
      {category}번 공지 페이지 입니다
      <p>{data?.subject}</p>
      <p>{data?.description}</p>
      <p>{data?.adminNickname}</p>
      <p>{data?.regDate}</p>
      <p>{data?.fileList}</p>
      <p>{data?.projectId}</p>
      <label htmlFor="generation">차수 선택</label>
      <select name="generation" id="generation" onChange={(e)=>changeOpt(e.target.value)}>
        {
          genList?.map((option, index) => {
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
