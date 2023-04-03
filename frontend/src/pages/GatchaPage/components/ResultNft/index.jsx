import styled from "styled-components";
import tw from "twin.macro";

const ResultNft = () => {
  return (
    <Page>
      <Container>
        <Box>
          <Mark>?</Mark>
        </Box>
      </Container>
      <ButtonGroup>
        <SubmitButton type="submit">1회 뽑기</SubmitButton>
      </ButtonGroup>
    </Page>
  );
};

const Page = styled.div`
  background-color: #fafaf3;
  height: 89vh;
  width: 100vw;
`;

const Container = styled.div`
  ${tw`
  flex items-center justify-center 
  `}
`;

const Box = styled.div`
  height: 400px;
  width: 400px;
  background-color: rgb(225, 237, 213);
  ${tw`
  flex
  items-center justify-center
  `}
`;

const ButtonGroup = styled.div`
  justify-content: center;
  ${tw`
  flex
  `}
`;

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  ${tw` my-4 py-3 px-10 font-semibold text-black
  `};
`;

const Mark = styled.h1`
  ${tw`
  text-white
  text-9xl
  `}
`;

export default ResultNft;
