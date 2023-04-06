import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import 다람쥐 from "../../../assets/img/다람쥐.png"
import 토끼 from "../../../assets/img/토끼.png"
import 흑두루미 from "../../../assets/img/흑두루미.png"

// 수연: 기부 페이지 카드 출력
const DonationCard = (props) => {
  const navigate = useNavigate();
  const { id, donationResDto, projectReqDto  } = props.card;
  // 수연: 프로젝트별 이미지 하드코딩, 프로젝트 id별로 이미지 입력할 것
  const imageSrc = {
    'SQUIRREL':다람쥐,
    'CRANE':흑두루미,
    'WILD_ANIMAL':토끼,
  }
  //   {
  //     // id 0은 없으므로 사용 X
  //     image:다람쥐,
  //     href: "/donation/0",
  //   },
  //   {
  //     image:다람쥐,
  //     href: "/donation/0",
  //   },
  //   {
  //     image:토끼,
  //     href: "/donation/1",
  //   },
  //   {
  //     image:흑두루미,
  //     href: "/donation/2",
  //   }
  // ];
  
  const goPage = (id) => {
    navigate(`/donation/${id}`, { replace: false });
  };

  return (
    <>
      <Card onClick={(e) => {e.preventDefault(); goPage(id)}}>
        <CardImage className="card_image">
          <img className="inner_image" src={imageSrc[projectReqDto.category]} alt=""/>
        </CardImage>
        
        <CardContent className="card_content">
          <p className="card_title">{donationResDto.subject}</p>
          <p className="card_desc">{donationResDto.description}</p>
          {/* <p className="card_target_amount">목표금액: {donationResDto.targetAmount?.toLocaleString("ko-KR")}원</p> */}
          {/* <p className="card_start_date">
            시작일: {donationResDto.startDate.slice(0, 4)}년{" "}
            {donationResDto.startDate.slice(5, 7)}월{" "}
            {donationResDto.startDate.slice(8, 10)}일
            마감일: {donationResDto.endDate.slice(0, 4)}년{" "}
            {donationResDto.endDate.slice(5, 7)}월{" "}
            {donationResDto.endDate.slice(8, 10)}일
          </p> */}
        </CardContent>
      </Card>
    </>
  )
}

const Card = styled.div`
  max-width: 250px;
  border-radius: 10px;
  overflow: hidden;
  flex-basis: 25%;
  margin: 0 15px;
  cursor: pointer;
  background: #EBEBEB;
  box-shadow: 2px 2px 2px #0000001a;
  display: inline-block;
  transition: 0.15s;

  &:hover .card_content{
    background: #DC653F;
  }
  &:hover .card_image{
    background: #FAFAFA;
    filter: grayscale(0%);
  }
  &:hover {    
    box-shadow: 9px 9px 4px #00000033;
  }
`;
const CardImage = styled.div`  // 가로세로 1:1 비율 유지 - 이은혁
height: 0;
width: 100%;
padding-bottom: 100%;
position: relative;
overflow: hidden;
background: inherit;
filter: grayscale(100%);
& > .inner_image {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  padding: 10%;
  top: 0;
  left: 0;
}
`;
const CardContent = styled.div`
  padding: 20px 25px;
  background: #A1A1A1;
  font-size: 0.8rem;
  text-align: left;
  color: white;
  height: 180px;

  & > .card_title {
    font-weight: 900;
    margin-bottom: 10px;
    font-size: 0.95rem;
  }
`;
export default DonationCard;
