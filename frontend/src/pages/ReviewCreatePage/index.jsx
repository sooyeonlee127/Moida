import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import api from "../../api/auth";
import { useLocation, useNavigate } from "react-router-dom";

// 혜수: 사용자 인증글 생성 페이지
const ReviewCreatePage = () => {
  const location = useLocation();
  const volunteerId = location.state.volunteerId;
  const category = location.state.category;
  const projectId = location.state.projectId;
  // console.log(volunteerId, category);

  const [cancel, setCancel] = useState(false);

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
  const [file, setFile] = useState(null);
  const [state, onChange] = useInputs({
    subject: "",
    description: "",
    difficultyLevel: 0,
  });

  const { subject, description, difficultyLevel } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    let testData = {
      subject: state.subject,
      description: state.description,
      difficultyLevel: state.difficultyLevel,
      category: category,
      usersVolunteerProjectId: volunteerId,
    };

    const formData = new FormData();
    formData.append(
      "article",
      new Blob([JSON.stringify(testData)], {
        type: "application/json",
      })
    );
    formData.append("file", file);
    api
      .post("/article", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        // console.log(res);
        if (window.confirm("작성되었습니다.")) {
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
        if (cancel === false) {
          alert("등록을 실패하였습니다.");
        }
      });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    alert("취소되었습니다");
    setCancel(!cancel);
    navigate(-1);
  };

  return (
    <>
      <Container>
        <InnerContainer>
          <div>
            <Heading>리뷰 작성하기</Heading>
            <hr></hr>
          </div>
          <InputGroup>
            <InputDiv>
              <InputText htmlFor="difficultyLevel">
                {" "}
                봉사는 어떠셨나요?{" "}
              </InputText>
              <LevelBox>
                <LevelLabel>쉬움</LevelLabel>
                <InnerBox>
                  <LevelInput
                    id="difficultyLevel"
                    name="difficultyLevel"
                    type="range"
                    min="0"
                    max="5"
                    value={difficultyLevel}
                    step="1"
                    onChange={onChange}
                  />
                </InnerBox>
                <LevelLabel>어려움</LevelLabel>
              </LevelBox>
            </InputDiv>
          </InputGroup>
          <ReviewForm method="POST" onSubmit={handleSubmit}>
            <div></div>
            <InputGroup>
              <InputDiv>
                <ReviewInputTitle
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="제목"
                  value={subject}
                  onChange={onChange}
                />
                <ReviewInputDescription
                  id="description"
                  name="description"
                  type="text"
                  placeholder="내용"
                  value={description}
                  onChange={onChange}
                />
              </InputDiv>
            </InputGroup>
            <InputGroup>
              <div></div>
              <FileContainer>
                <FileLabel for="dropzone-file">
                  <FileBox>
                    <FilePath
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></FilePath>
                    <FileP>사진 첨부하기</FileP>
                  </FileBox>
                  <FileInput
                    id="dropzone-file"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length !== 0) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </FileLabel>
              </FileContainer>
            </InputGroup>
            <ButtonDiv>
              <SubmitButton type="submit">작성완료</SubmitButton>
              <CancelButton onClick={handleCancel}>취소</CancelButton>
            </ButtonDiv>
          </ReviewForm>
        </InnerContainer>
      </Container>

      <hr></hr>
    </>
  );
};

export default ReviewCreatePage;

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 `}
`;

const InnerContainer = styled.div`
  ${tw`
  w-full max-w-md space-y-8
  `}
`;

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-3xl font-semibold tracking-tighter text-gray-900
  `}
  margin-bottom: 20px;
`;

const ReviewForm = styled.form`
  ${tw`
  mt-8 space-y-6
  `}
`;

const InputGroup = styled.div`
  ${tw`
  -space-y-px rounded-lg shadow-sm 
  `}
`;

const InputText = styled.label`
  ${tw`
  block text-lg font-semibold leading-6 text-gray-900 tracking-tighter
  `}
`;

const ReviewInputTitle = styled.input`
  height: 50px;
  border: 1px solid rgb(220, 220, 220);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  ${tw`
    pl-5
  `}
`;

const ReviewInputDescription = styled.textarea`
  height: 200px;
  border-bottom: 0;
  border: 1px solid rgb(220, 220, 220);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  ${tw`
  pl-5 pt-3
  `}
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  color: white;
  width: 50%;
  height: 55px;
  border-radius: 10px;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: rgb(205, 205, 205);
  color: white;
  width: 50%;
  height: 55px;
  border-radius: 10px;
  margin-left: 10px;
`;

const FileContainer = styled.div`
  ${tw`
  flex items-center justify-center w-full
  `}
`;

const FileLabel = styled.label`
  ${tw`
  flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white
  `}
`;

const FileBox = styled.div`
  ${tw`
  flex flex-col items-center justify-center pt-5 pb-6
  `}
`;

const FilePath = styled.path``;

const FileP = styled.p`
  ${tw`
  mb-2 text-sm text-gray-500 dark:text-gray-400
  `}
`;

const FileInput = styled.input`
  ${tw`
  hidden
  `}
`;

const LevelLabel = styled.div`
  ${tw`
  block mb-2 text-sm text-gray-900 font-semibold tracking-tighter
  `}
`;

const LevelInput = styled.input`
  ${tw`
  w-full h-2 mt-3 rounded-lg cursor-pointer  
  `}
`;

const LevelBox = styled.div`
  ${tw`
  grid grid-cols-5 pt-3
  `}
`;

const InnerBox = styled.div`
  ${tw`
col-span-3
`}
`;
