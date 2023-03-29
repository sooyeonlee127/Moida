import styled from "styled-components";
import tw from "twin.macro";
import { useState, useReducer } from "react";
import axios from "axios";

// 수연: 관리자 봉사 인증코드 조회 페이지
const AuthCordPage = () => {
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
    volunteerdateinfoid: "",
  });
  const { volunteerdateinfoid } = state;
  const [flag, setFlag] = useState(true); // 봉사일 되면 조회 가능한 것으로 변경해야함.

  const [code, setCode] = useState("");

  const CheckCode = () => {
    if (!volunteerdateinfoid) {
      alert("봉사 id를 입력해주세요.");
    } else {
      console.log(volunteerdateinfoid);
      axios
        .get(`/api/project/volunteer/${volunteerdateinfoid}/auth-code`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            refresh: localStorage.getItem("refreshToken"),
          },
        })
        .then((res) => {
          console.log(res);
          setCode(res.data);
          console.log("완료"); // 완료되나, data가 ""로 나옴
        })
        .catch((error) => {
          const response = error.response.data;
          console.log(response);
          setCode(response.message);
        });
    }
  };
  if (flag) {
    return (
      <>
        <Container>
          <InnerContainer>
            <div>
              <Heading>관리자 페이지</Heading>
            </div>
            <AdminForm action="#" method="POST">
              <InputGroup>
                <div>
                  <Title>봉사 확인 인증코드 조회</Title>
                  <Message>{code}</Message>
                </div>
                <div>
                  <InputText htmlFor="volunteerdateinfoid">
                    봉사 id를 입력해주세요.
                  </InputText>
                  <AdminInput
                    id="volunteerdateinfoid"
                    name="volunteerdateinfoid"
                    type="number"
                    value={volunteerdateinfoid}
                    onChange={onChange}
                  />
                </div>
              </InputGroup>
              <div>
                <SubmitButton
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    CheckCode();
                  }}
                >
                  조회하기
                </SubmitButton>
              </div>
            </AdminForm>
          </InnerContainer>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <InnerContainer>
            <div>
              <Heading>관리자 페이지</Heading>
            </div>
            <AdminForm action="#" method="POST">
              <InputGroup>
                <InnerContainer>
                  아직 조회 가능한 코드가 없습니다...
                </InnerContainer>
              </InputGroup>
            </AdminForm>
          </InnerContainer>
        </Container>
      </>
    );
  }
};

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-xl font-normal text-indigo-500
  `}
`;

const Title = styled.h2`
  ${tw`
  text-center text-lg font-normal text-gray-900
  `}
`;

const Message = styled.h2`
  ${tw`
  text-center text-lg font-semibold  text-rose-400

  `}
`;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  w-full max-w-md mt-8 px-5 py-5
  `}
`;

const AdminForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px shadow-sm
  `}
`;

const InputText = styled.label`
  ${tw`
  px-1 mt-4 flex text-sm font-light leading-6 text-gray-500
  `}
`;

const AdminInput = styled.input`
  ${tw`
  relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const SubmitButton = styled.button`
  background-color: #ca8a04;
  padding: 0.5rem 2.5rem;
  font-weight: 600;
  color: black;
`;
export default AuthCordPage;
