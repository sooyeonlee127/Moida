import styled from "styled-components";
import tw from "twin.macro";
import ResultModal from "./components/ResultModal";

const GatchaPage = () => {
  return (
    <Container>
      <div>
        <ResultModal />
        <ButtonGroup>
          <SubmitButton type="submit">1회 뽑기</SubmitButton>
          <SubmitButton type="submit">10회 뽑기</SubmitButton>
        </ButtonGroup>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-20 px-8
  `}
`;

const ButtonGroup = styled.div`
  ${tw`
  m-5
  flex items-center justify-between
  grid grid-cols-2 gap-4
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;

export default GatchaPage;
