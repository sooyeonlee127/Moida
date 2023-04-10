import styled from "styled-components";
import tw from "twin.macro";

const ResultModal = () => {
  return (
    <Container>
      <Mark>?</Mark>
    </Container>
  );
};

const Container = styled.div`
  ${tw`
  flex
  items-center justify-center
  w-full
  h-80 
  bg-yellow-200
  `}
`;

const Mark = styled.h1`
  ${tw`
  text-white
  text-9xl
  `}
`;

export default ResultModal;
