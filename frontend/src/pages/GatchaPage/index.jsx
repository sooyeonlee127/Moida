import ResultNft from "./components/ResultNft";
import CharacterList from "./components/CharacterList";
import styled from "styled-components";
import tw from "twin.macro";

const GatchaPage = () => {
  return (
    <>
      <Container>
        <ResultNft />
      </Container>
      <Container>
        <CharacterList />
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`my-2`}
  padding-bottom: 100px;
`;

export default GatchaPage;
