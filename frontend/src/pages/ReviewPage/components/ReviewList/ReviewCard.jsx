import styled from "styled-components";
import tw from "twin.macro";


const ReviewCard = (props) => {
    const review = props.review;
    return (
      <div className="group relative">
        {/* <a href={props.review.href}> */}
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
          {/* <PTag className="ReivewPrice">{review.date}</PTag> */}
        </ReviewContent>
        {/* </a> */}
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