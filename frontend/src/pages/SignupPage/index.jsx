// import { useState } from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import Form from "./components/form";
import MetamaskCheck from "./components/MetamaskCheck";
const SignupPage = () => {
  return (
    <Container>
      <InnerContainer>
        <Heading>회원가입</Heading>
        <MetamaskCheck />
        <Form />
      </InnerContainer>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  ${tw`
    flex min-h-full items-center justify-center py-12
`}
`;

const InnerContainer = styled.div`
  ${tw`
  bg-gray-100 px-20 py-7 w-full max-w-xl space-y-8
  `}
`;

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-4xl font-normal tracking-normal text-gray-700
  `}
`;

export default SignupPage;
