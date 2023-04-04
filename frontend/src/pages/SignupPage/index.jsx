// import { useState } from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import Form from "./components/form";
import MetamaskCheck from "../../components/MetamaskCheck";
import logo from "../../assets/img/Logo.svg";

const SignupPage = () => {
  return (
    <Container>
      <InnerContainer>
        {/* <ImageBox>
          <Image src={logo} alt="" width="90" />
        </ImageBox> */}
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
  background-color: #fafaf3;
  ${tw`
    flex min-h-full items-center justify-center py-12
`}
`;

const InnerContainer = styled.div`
  ${tw`
  px-20 py-7 w-full max-w-xl space-y-8
  `}
`;

const Heading = styled.h2`
  color: rgb(75, 75, 75);
  ${tw`
  mt-6 text-center text-3xl font-black
  `}
`;

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;
export default SignupPage;
