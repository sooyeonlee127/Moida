import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const reducer = (state, action) => {
    return {
      ...state,
      [action.name]: action.value,
    };
  };
  const useInputs = (initialForm) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = (e) => {
      dispatch(e.target);
    };
    return [state, onChange];
  };
  const [state, onChange] = useInputs({
    email: "",
    password: "",
    remember: false,
  });

  const { email, password, remember } = state;

  const checkedRemeberMe = () => {
    const checkbox = document.getElementById("remember-me");
    const is_checked = checkbox.checked;
    state.remember = is_checked;
  };

  const loginSubmit = () => {
    console.log("email", state.email);
    console.log("password:", state.password);
    console.log("remember", state.remember);
    axios({
      url: "/api/auth/login",
      method: "POST",
      data: {
        email: state.email,
        password: state.password,
      },
    })
      .then((res) => {
        const token = res.headers.authorization;
        localStorage.setItem("accessToken", token);
        console.log(res);
        navigate("/", { replace: true });
        navigate(0);
      })
      .catch((error) => {
        const response = error.response.data;
        if (response.status === 404) {
          alert("로그인 실패! 존재하지 않는 회원입니다.");
        } else if (response.status === 401) {
          alert("로그인 실패! 비밀번호를 확인해주세요.");
        } else {
          alert(response.message);
        }
      });
  };

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
                value={email}
                type="email"
                autoComplete="email"
                required
                onChange={onChange}
              />
            </div>
            <div>
              <InputText htmlFor="password">PASSWORD</InputText>
              <LoginInput
                id="password"
                name="password"
                value={password}
                type="password"
                autoComplete="current-password"
                required
                onChange={onChange}
              />
            </div>
          </InputGroup>
          <RememberMeContainer>
            <RememberMeBox>
              <RememberMe
                id="remember-me"
                name="remember-me"
                type="checkbox"
                value={remember}
                onClick={(e) => {
                  checkedRemeberMe();
                }}
              />
              <RememberMeText htmlFor="remember-me">Remember me</RememberMeText>
            </RememberMeBox>
          </RememberMeContainer>
          <div>
            <SubmitButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                loginSubmit();
              }}
            >
              로그인
            </SubmitButton>
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
