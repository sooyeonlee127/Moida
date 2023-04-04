import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import logo from "../../assets/img/Logo.svg";

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
        setRole(data.role);
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
          {/* <ImageBox>
            <Image src={logo} alt="" width="90" />
          </ImageBox> */}
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
  color: rgb(75, 75, 75);
  ${tw`
  mt-6 text-center text-3xl font-black
  `}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fafaf3;
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  px-10 py-7 w-full max-w-md space-y-9
  `}
`;

const LoginForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px
  `}
`;

const InputText = styled.label`
  color: rgb(75, 75, 75);
  ${tw`
  px-1 mt-4 flex text-sm font-bold leading-6
  `}
`;

const LoginInput = styled.input`
  background-color: #fafaf3;
  ${tw`
  relative block w-full px-2 py-1.5 border-b-2 border-gray-300
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
  h-5 w-5 border-gray-200 text-green-600
  `};
`;

const RememberMeText = styled.label`
  color: rgb(75, 75, 75);
  ${tw`
  ml-2 block text-sm font-medium
  `}
`;

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  color: rgb(75, 75, 75);
  ${tw`
  w-full h-full py-3 px-10 font-semibold 
  `}
`;

const PasswordButton = styled.button`
  background-color: rgb(225, 237, 213);
  color: rgb(75, 75, 75);
  ${tw`
  w-full h-full mt-3 py-3 px-10 font-semibold 
  `}
`;

const ImageBox = styled.div`
  ${tw`
  flex justify-center my-10
  `}
`;

const Image = styled.img``;

export default LoginPage;
