// 공지사항. notice. 추후 PDF viewer로 연결. 
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";


const NoticeCard = () => {
  const { noticeid } = useParams(); // const 변수명 = useParams().파라미터명;
  const category = useParams("category")
  const getNotice = async () => {
    try{
      const response = await axios({
        url: "/api/article/board/category/"+category,
        method: "GET",
        headers: {
          accept: "*/*"
        }
      })
      if (response.data.status===200){
        console.log("정상")
        console.log(response)
      } 
    } catch(err) {
      console.log(err)
    }
    
  }
  
  return (
    <>
      <Box></Box>
      {noticeid}번 공지 페이지 입니다
    </>
  )
}


export default NoticeCard;


const Box = styled.div`
${tw`h-16`}
`