import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const PointPage = () => {
  const [currentPoint, setCurrentPoint] = useState(0);

  const donate = (price) => {
    setCurrentPoint(currentPoint + price);
  };

  return (
    <PointContainer>
      <LeftSide>
        <Heading>블록체인 사진</Heading>
      </LeftSide>
      <RightSide>
        <PointForm>
          <Box>
            <InnerBox>
              <Text>금액</Text>
              <Text>{currentPoint} 원</Text>
            </InnerBox>
          </Box>
          <Box>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                setCurrentPoint(0);
              }}
            >
              초기화
            </PointButton>
            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(50000);
              }}
            >
              +50000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(10000);
              }}
            >
              +10000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(5000);
              }}
            >
              +5000
            </PointButton>

            <PointButton
              onClick={(e) => {
                e.preventDefault();
                donate(1000);
              }}
            >
              +1000
            </PointButton>
          </Box>

          <Box>
            <InnerBox>
              <Text>최종 결제 금액</Text>
            </InnerBox>
            <Text>카카오페이 API</Text>
          </Box>
          <SubmitButton type="submit">결제하기</SubmitButton>
        </PointForm>
      </RightSide>
    </PointContainer>
  );
};

const PointContainer = styled.div`
  ${tw`
  mx-auto max-w-2xl px-4 pt-10 pb-16
  grid grid-cols-2 gap-2
  `}
`;

const LeftSide = styled.div`
  ${tw`
  row-span-3

`}
`;

const RightSide = styled.div`
  ${tw`
  row-span-3
mt-4 lg:row-span-3 lg:mt-0
`}
`;

const InnerBox = styled.div`
  ${tw`
flex items-center justify-between
`}
`;

const Box = styled.div`
  ${tw`
mt-10
`}
`;

const Heading = styled.h1`
  ${tw`
  text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl
`}
`;

const PointForm = styled.form`
  ${tw`
  mt-10
`}
`;
const PointButton = styled.button`
  ${tw`
  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1
  `}
`;

const Text = styled.h3`
  ${tw`
text-sm font-medium text-gray-900
`}
`;

const SubmitButton = styled.button`
  ${tw`
mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white 
`}
`;

export default PointPage;
