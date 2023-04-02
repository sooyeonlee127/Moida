import styled from "styled-components";
import tw from "twin.macro";

const CharacterList = () => {
  return (
    <Container>
      <h1>CharacterList</h1>
      <CharacterBox>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
        <Image></Image>
      </CharacterBox>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fafaf3;
  height: 89vh;
  width: 100vw;
  ${tw`
  items-center justify-center
  `}
`;

const CharacterBox = styled.div`
  ${tw`
  grid grid-cols-5 gap-2 ml-10
  `}
`;

const Image = styled.div`
  height: 250px;
  width: 250px;
  ${tw`
  bg-yellow-100
  `}
`;
export default CharacterList;
