import styled from "styled-components";
import tw from "twin.macro";

// 수연: 기부 페이지 카드 출력
const DonationCard = (props) => {
  const { id, donationResDto } = props.card;
  // 수연: 프로젝트별 이미지 하드코딩, 프로젝트 id별로 이미지 입력할 것
  const imageList = [
    {
      // id 0은 없으므로 사용 X
      image:
        "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
      href: "/donation/0",
    },
    {
      image:
        "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
      href: "/donation/1",
    },
    {
      image:
        "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
      href: "/donation/2",
    },
    {
      image:
        "https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/",
      href: "/donation/3",
    },
  ];

  return (
    <>
      <Card>
        <CardImage src={imageList[id].image}></CardImage>
        <CardTitle>{donationResDto.subject}</CardTitle>
        <CardContent>{donationResDto.description}</CardContent>
        <CardContent>목표금액: {donationResDto.targetAmount}원</CardContent>
        <CardContent>
          시작일: {donationResDto.startDate.slice(0, 4)}년{" "}
          {donationResDto.startDate.slice(5, 7)}월{" "}
          {donationResDto.startDate.slice(8, 10)}일
        </CardContent>
        <CardContent>
          마감일: {donationResDto.endDate.slice(0, 4)}년{" "}
          {donationResDto.endDate.slice(5, 7)}월{" "}
          {donationResDto.endDate.slice(8, 10)}일
        </CardContent>
        <WrapBtn>
          <Button href={imageList[id].href}>자세히</Button>
        </WrapBtn>
      </Card>
    </>
  );
};

const Card = styled.div`
  ${tw`w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900 mx-2`}
`;
const CardImage = styled.img`
  ${tw``}
`;
const CardContent = styled.div`
  ${tw`px-5 pb-5`}
`;
const CardTitle = styled.p`
  ${tw`text-xl font-semibold tracking-tight text-gray-900 dark:text-white`}
`;
const WrapBtn = styled.div`
  ${tw`flex items-center justify-between`}
`;
const Button = styled.a`
  cursor: pointer;
  ${tw`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
`;
export default DonationCard;
