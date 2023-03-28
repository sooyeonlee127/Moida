// 공지사항. notice. 추후 PDF viewer로 연결. 
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";


const NoticeCard = () => {
  const { noticeid } = useParams(); // const 변수명 = useParams().파라미터명;
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