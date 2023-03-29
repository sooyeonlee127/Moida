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
    console.log(subject, description, projectid);
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
    formData.append("files", files);
    api
      .post("/article/board", formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        console.log(res);
        alert("공지글 생성 완료했습니다.");
      });
    // .catch((error) => {
    //   const response = error.response.data;
    //   console.log(response);
    // });
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
                      console.log(files);
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
                      console.log(files);
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
                      console.log(files);
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
                      console.log(files);
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
                      console.log(files);
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
  mt-6 text-center text-xl font-normal text-indigo-500
  `}
`;

const Title = styled.h2`
  ${tw`
  text-center text-lg font-normal text-gray-900
  `}
`;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
  bg-gray-200 w-full max-w-md mt-8 px-5 py-5
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
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;
export default NoticeCreatePage;
