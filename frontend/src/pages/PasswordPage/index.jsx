import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 수연: 비밀번호 찾기 페이지
const PasswordPage = () => {
  const navigate = useNavigate()
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
    if (!email) {
      alert("이메일을 입력해주세요.");
    } else {
      setMessage("임시 비밀번호 발송중입니다...");
      axios({
        url: `/api/users/forgot-password/${email}`,
        method: "POST",
      })
        .then((res) => {
          setMessage(
            "임시 비밀번호 발송이 완료되었습니다. 메일함을 확인해주세요."
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setMessage("해당 이메일 주소로 가입한 계정이 존재하지 않습니다.");
          } else {
            setMessage(
              "임시 비밀번호 발송이 실패하였습니다. 이메일을 다시 확인해주세요."
            );
          }
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
                <Button onClick={()=>navigate("/login", { replace: true })}>돌아가기</Button>
              </InputGroup>
            </PasswordForm>
          </InnerContainer>
        </Container>
      </>
    );
  }
};
const Button = styled.button`
background-color: rgb(160, 200, 70);
    color: rgb(75, 75, 75);
    height: 100%;
    width: 100%;
    padding: 0.75rem 2.5rem;
    font-weight: 600;
`

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-4xl font-normal tracking-normal text-gray-700
  `}
`;

const Container = styled.div`
  height: 100%;
  width: 100vw;
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
width: 100%;
max-width: 28rem;
padding: 1.75rem 2.5rem;
`;

const PasswordForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px rounded-md
  `}
`;

const InputText = styled.label`
  ${tw`
  px-1 mt-4 flex text-sm font-light leading-6 text-gray-500
  `}
`;

const LoginInput = styled.input`
border-bottom: 1px solid #d8d8d8;
padding: 10px 5px;
margin-bottom: 5px;
display: block;
width: 100%;
background: transparent;
`;

const PasswordText = styled.label`
margin-bottom: 3rem;
  ${tw`
  ml-2 block text-sm text-gray-900 font-light
  `}
`;

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  color: rgb(75, 75, 75);
  height: 100%;
  width: 100%;
  padding: 0.75rem 2.5rem;
  font-weight: 600;
`;

export default PasswordPage;
