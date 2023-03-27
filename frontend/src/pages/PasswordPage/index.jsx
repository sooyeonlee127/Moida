import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import axios from "axios";

const PasswordPage = () => {
  const reducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };
  const [message, setMessage] = useState("");
  const useInputs = (initialForm) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = (e) => {
      dispatch(e.target);
    };
    return [state, onChange];
  };
  const [state, onChange] = useInputs({
    email: "",
  });

  const { email } = state;
  const PasswordSubmit = () => {
    console.log("email", email);
    if (!email) {
      alert("이메일을 입력해주세요.");
    } else {
      setMessage("임시 비밀번호 발송중입니다...");
      axios({
        url: `/api/users/forgot-password/${email}`,
        method: "POST",
      })
        .then((res) => {
          console.log(res);
          setMessage(
            "임시 비밀번호 발송이 완료되었습니다. 메일함을 확인해주세요."
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (!message) {
    return (
      <Container>
        <InnerContainer>
          <div>
            <Heading>비밀번호 찾기</Heading>
          </div>
          <PasswordForm action="#" method="POST">
            <InputGroup>
              <div>
                <PasswordText>
                  가입시 등록한 이메일을 입력해주세요.
                </PasswordText>
                <InputText htmlFor="email">EMAIL</InputText>
                <LoginInput
                  id="email-address"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <div>
              <SubmitButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  PasswordSubmit();
                }}
              >
                비밀번호 찾기
              </SubmitButton>
            </div>
          </PasswordForm>
        </InnerContainer>
      </Container>
    );
  } else {
    return (
      <>
        <Container>
          <InnerContainer>
            <PasswordForm action="#" method="POST">
              <InputGroup>
                <PasswordText>{message}</PasswordText>
              </InputGroup>
            </PasswordForm>
          </InnerContainer>
        </Container>
      </>
    );
  }
};

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-4xl font-normal tracking-normal text-gray-700
  `}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  bg-gray-100 px-20 py-7 w-full max-w-md space-y-8
  `}
`;

const PasswordForm = styled.form`
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
  px-1 mt-4 flex text-sm font-light leading-6 text-gray-500
  `}
`;

const LoginInput = styled.input`
  ${tw`
  relative block w-full border-0 px-2 py-1.5 text-gray-800 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const PasswordText = styled.label`
  ${tw`
  ml-2 block text-sm text-gray-900 font-light
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  bg-yellow-300 w-full h-full  py-3 px-10 font-normal text-gray-600
  `}
`;

export default PasswordPage;
