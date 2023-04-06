// 공지사항. notice. 추후 PDF viewer로 연결. 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import { useEffect } from "react";


const NoticeDetailPage = () => {
  const { category } = useParams(); // const 변수명 = useParams().파라미터명;
  const [genList, setGenList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({})
  const navigate = useNavigate()
  // console.log("category: ", category)

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
      setIsLoading(true)
      const res = await axios({
        url: "/api/article/board/category/"+category,
        method: "GET",
        headers: {
          accept: "*/*"
        }
      })
      if(res) {
        setIsLoading(false)
        setData(res.data.getBoardDetailResDto)
        setGenList(res.data.generationList)
        console.log(res.data)
      }
    } catch(err) {
      setIsLoading(false)
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
      console.log(res.data)
      setData(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  
  // 날짜 형식 변경
  console.log(data?.regDate)
  const date = new Date(data?.regDate);
  const year = String(date.getFullYear()).slice(0,4)
  const tmpM = String(date.getMonth()+1)
  const tmpD = String(date.getDate())
  const month = tmpM.length===1 ? "0"+tmpM : tmpM;
  const day = tmpD.length===1 ? "0"+tmpD : tmpD;

  return (
    <Wrapper>
      <div>
      {/* {category}번 공지 페이지 입니다
      <p>{data?.subject}</p>
      <p>{data?.description}</p>
      <p>{data?.adminNickname}</p>
      <p>{data?.regDate}</p>
      <p>{data?.fileList}</p>
      <p>{data?.projectId}</p>
  <label htmlFor="generation">차수 선택</label>*/}
      <div className="subject">
        <Subject>{data?.subject}</Subject>
        <RegDate>{year+"."+month+"."+day}</RegDate>
      </div>
      <Header>
        <Writter>관리자</Writter>
        <SelectBox>
          <label htmlFor="generation">차수</label>
          <select name="generation" id="generation" onChange={(e)=>changeOpt(e.target.value)}>
            {
              genList?.map((option, index) => {
                return(
                  <option key={index} value={option?.id}>{option.generation}차 프로젝트</option>
                  )
                })
              }
          </select>
        </SelectBox>
      </Header>
      <Content>
        <div className="main_content">{
          data?.fileList?.map((file, index) => {
            <ReviewImg key={index} src={ !isLoading && file ? file : "" } alt=""></ReviewImg>
          })
        }
          <div>{data?.description}</div>
        </div>
        
        <div className="content_footer">
          <Button onClick={()=>navigate("/review")}>목록</Button>
        </div>
      </Content>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 100%;
padding-top: 56px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;

& > div {
  width: 100%;
  max-width: 1000px;
}
& .subject {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
}
`
const Subject = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: left;
`
const RegDate = styled.p`
  color: rgb(120, 116, 116);
  font-weight: 100;
  font-size: 0.9rem;
`
const ReviewImg = styled.img`
  display : block;
  border-radius : 15px;
`
const SelectBox = styled.div`
color: #62666e;
font-weight: 500;
font-size: 0.95rem;
& > label { 
  // margin-right: .5rem;
}
& > select {
  padding: 0 20px;
  background: transparent;
  font-weight: 600;
}
`
const Header = styled.div`
padding: 10px 0;
display: flex;
flex-direction: row;
justify-content: space-between;
border-top: 1px solid #c0c0c0;
`
const Writter = styled.p`
color: rgb(120, 116, 116);
font-weight: 100;
font-size: 0.9rem;
`
const Content = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;

& > .main_content {
  width: 100%;
  min-height: 500px;
  // background: red;
}
& > .content_footer {
  width: 100%;
  border-top: 1px solid #c0c0c0;
  display: flex;
  flex-direction: row;
  padding: 30px 0 100px 0;
}
`
const Button = styled.button`
color: white;
background-color: rgb(160, 200, 70);
border-radius: 5px;
width: 80px;
height: 25px;
`
export default NoticeDetailPage;
