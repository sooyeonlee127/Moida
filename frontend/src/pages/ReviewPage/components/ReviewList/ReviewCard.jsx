import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";

//혜수: 사용자 리뷰 카드
const ReviewCard = (props) => {
    const review = props.review;
    const navigate = useNavigate();
    const onClickDiv = () => {
      navigate(`/review/${review.id}`)
    }

    return (
      <div onClick={onClickDiv} className="group relative">
        {review.id}
        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <Image src={review.url}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <ReviewContent>
          <CardName>
              <span>{review.subject}</span>
              <span>{review.difficultyLevel}</span>
          </CardName>
        </ReviewContent>
      </div>
    )
  }

const Image = styled.img`
border-radius: 10px;
${tw`hover:ring`}
`

const CardName = styled.h3`
${tw`text-sm text-gray-700`}
`

const ReviewContent = styled.div`
${tw`mt-4 flex justify-between`}
`


export default ReviewCard;