import styled from "styled-components";
import tw from "twin.macro";

const LoginPage = () => {
  return (
    <Container>
      <InnerContainer>
        <div>
          <Heading>로그인</Heading>
        </div>
        <LoginForm action="#" method="POST">
          <InputGroup>
            <div>
              <InputText htmlFor="email">EMAIL</InputText>
              <LoginInput
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <InputText htmlFor="password">PASSWORD</InputText>
              <LoginInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </InputGroup>
          <RememberMeContainer>
            <RememberMeBox>
              <RememberMe id="remember-me" name="remember-me" type="checkbox" />
              <RememberMeText htmlFor="remember-me">Remember me</RememberMeText>
            </RememberMeBox>
          </RememberMeContainer>
          <div>
            <SubmitButton type="submit">로그인</SubmitButton>
          </div>
        </LoginForm>
      </InnerContainer>
    </Container>
  );
};

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-3xl font-bold tracking-tight text-gray-900
  `}
`;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  w-full max-w-md space-y-8
  `}
`;

const LoginForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px rounded-md shadow-sm
  `}
`;

const InputText = styled.label`
  ${tw`
  block text-sm font-medium leading-6 text-gray-900
  `}
`;

const LoginInput = styled.input`
  ${tw`
  relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const RememberMeContainer = styled.div`
  ${tw`
  flex items-center justify-between
  `}
`;

const RememberMeBox = styled.div`
  ${tw`
  flex items-center
  `}
`;

const RememberMe = styled.input`
  ${tw`
  h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600
  `}
`;

const RememberMeText = styled.label`
  ${tw`
  ml-2 block text-sm text-gray-900
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;

export default LoginPage;
