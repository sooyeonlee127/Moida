import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/auth";
// 수연: 관리자 공지글 생성 페이지
const NoticeCreatePage = () => {
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
  const { projectid } = useParams();
  const [files, setFiles] = useState([]);
  const [state, onChange] = useInputs({
    subject: "",
    description: "",
  });
  const { subject, description } = state;

  const adminSubmit = () => {
    let testData = {
      subject: subject,
      description: description,
      projectId: projectid,
    };
    const formData = new FormData();
    formData.append(
      "board",
      new Blob([JSON.stringify(testData)], {
        type: "application/json",
      })
    );
    // 파일 업로드 리스트 형태로 변경
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    api
      .post("/article/board", formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        if (res) {
          alert("공지글 생성 완료했습니다.");
        }
      });
  };
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
                <Title>공지글 생성 페이지</Title>
              </div>
              <div>
                <InputText htmlFor="subject">subject</InputText>
                <AdminInput
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="description">description</InputText>
                <AdminLargeInput
                  id="description"
                  name="description"
                  type="text"
                  rows="4"
                  value={description}
                  onChange={onChange}
                ></AdminLargeInput>
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Title>files</Title>
              </div>
              <div>
                <InputText htmlFor="files">files</InputText>
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, e.target.files[0]]);
                    }
                  }}
                />
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, e.target.files[0]]);
                    }
                  }}
                />
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, e.target.files[0]]);
                    }
                  }}
                />
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, e.target.files[0]]);
                    }
                  }}
                />
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles([...files, e.target.files[0]]);
                    }
                  }}
                />
              </div>
            </InputGroup>
            <div>
              <SubmitButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  adminSubmit();
                }}
              >
                제출하기
              </SubmitButton>
            </div>
          </AdminForm>
        </InnerContainer>
      </Container>
    </>
  );
};

const Heading = styled.h2`
  ${tw`
  text-center text-xl text-gray-900 font-black tracking-tighter
  `}
`;

const Title = styled.h2`
  ${tw`
  text-center text-lg font-normal text-gray-900 tracking-tighter
  `}
`;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  border-2 border-neutral-100 w-full max-w-md mt-8 px-5 py-5
  `}
`;

const AdminForm = styled.form`
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

const AdminInput = styled.input`
  ${tw`
  relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const AdminLargeInput = styled.textarea`
  ${tw`
  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full py-2 px-10 font-normal text-black
  bg-amber-200 hover:bg-amber-400 active:bg-amber-500 mx-1
  `}
`;
export default NoticeCreatePage;
