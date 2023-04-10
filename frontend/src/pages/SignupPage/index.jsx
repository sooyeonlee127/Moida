// import { useState } from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import Form from "./components/form";
import logo from "../../assets/img/Logo.svg";

const SignupPage = () => {

  return (
    <Container>
      <InnerContainer>
        {/* <ImageBox>
          <Image src={logo} alt="" width="90" />
        </ImageBox> */}
        <Heading>회원가입</Heading>
        <Form />
      </InnerContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  background-color: rgb(250, 250, 243);
  display: flex;
  min-height: 100%;
  -webkit-box-align: center;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 1rem 0;
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
