import styled from "styled-components";
import tw from "twin.macro";

const MainCard = (props) => {
  const { title, content } = props.card;
  return (
    <>
      <Container>
        <Box>
          <InnerBox>
            <Heading>{title}</Heading>
            <Text>{content}</Text>
            <Button>참여하기</Button>
          </InnerBox>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`
  mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8
  `}
`;

const Box = styled.div`
  ${tw`
  relative isolate overflow-hidden px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0
  `}
`;

const InnerBox = styled.div`
  ${tw`
  mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left

  `}
`;

const Heading = styled.h2`
  ${tw`
  text-3xl font-bold tracking-tight text-black sm:text-4xl
`}
`;

const Text = styled.p`
  ${tw`
  mt-6 text-lg leading-8 text-gray-300
`}
`;

const Button = styled.button`
  ${tw`border px-2 py-2 hover:bg-sky-500 active:bg-sky-600`}
`;
export default MainCard;
