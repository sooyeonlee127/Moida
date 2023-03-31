import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

// 수연: 로그인 페이지
const LoginPage = () => {
  const { setIsLogin, setRole } = useContext(AuthContext);
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
    email: localStorage.getItem("email") || "",
    password: "",
    remember: false,
  });
  useEffect(() => {
    if (localStorage.getItem("email")) {
      state.remember = true;
      const checkbox = document.getElementById("remember-me");
      checkbox.checked = true;
    }
  }, []);
  const { email, password, remember } = state;

  const checkedRemeberMe = () => {
    const checkbox = document.getElementById("remember-me");
    const is_checked = checkbox.checked;
    state.remember = is_checked;
  };

  const loginSubmit = () => {
    axios({
      url: "/api/auth/login",
      method: "POST",
      data: {
        email: state.email,
        password: state.password,
      },
    })
      .then((res) => {
        // remember-me data 저장
        const checkbox = document.getElementById("remember-me");
        if (checkbox.checked) {
          localStorage.setItem("email", state.email);
        } else {
          if (localStorage.getItem("email")) {
            localStorage.removeItem("email");
          }
        }
        const data = res.data;
        const token = res.headers.authorization;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", res.headers.refresh);
        localStorage.setItem("role", data.role);
        setIsLogin(true);
        // 응답값으로 받아오기
        navigate("/", { replace: true });
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
              <RememberMeText htmlFor="remember-me">
                이메일 기억하기
              </RememberMeText>
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
            <PasswordButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate("/password", { replace: true });
              }}
            >
              비밀번호 찾기
            </PasswordButton>
          </div>
        </LoginForm>
      </InnerContainer>
    </Container>
  );
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
  px-1 mt-4 flex text-sm font-light leading-6 text-gray-500
  `}
`;

const LoginInput = styled.input`
  ${tw`
  relative block w-full border-0 px-2 py-1.5 text-gray-800 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
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
  h-5 w-5 border-gray-200 text-indigo-600 focus:ring-indigo-600
  `}
`;

const RememberMeText = styled.label`
  ${tw`
  ml-2 block text-sm text-gray-900 font-light
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  bg-yellow-300 w-full h-full  py-3 px-10 font-normal text-gray-600
  `}
`;

const PasswordButton = styled.button`
  ${tw`
  bg-gray-300 w-full h-full mt-3 py-3 px-10 font-normal text-gray-600
  `}
`;

export default LoginPage;
