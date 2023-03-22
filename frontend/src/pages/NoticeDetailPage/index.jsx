// 공지사항. notice. 추후 PDF viewer로 연결. 
import { useParams } from "react-router-dom";

const NoticeCard = () => {
  const { noticeid } = useParams(); // const 변수명 = useParams().파라미터명;
  return (
    <>
      {noticeid}번 공지 페이지 입니다
    </>
  )
}

export default NoticeCard;