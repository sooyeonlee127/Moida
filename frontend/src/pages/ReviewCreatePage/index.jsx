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
  console.log(volunteerId, category)

  const [cancel,setCancel] = useState(false);

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
    difficultyLevel: "",
  });

  const {
    subject,
    description,
    difficultyLevel,
  } = state;

  const handleSubmit = (e) => {
    e.preventDefault()
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
        console.log(res);
        if (window.confirm("작성되었습니다.")) {
          window.location.href = "/profile";}
        
        
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
        if (cancel === false) {
          alert("등록을 실패하였습니다.")
        }
      });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    alert('취소되었습니다')
    setCancel(!cancel)
    navigate(-1);
  }

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
                <InputText htmlFor="difficultyLevel"> 봉사는 어떠셨나요? </InputText>
                <ReviewInput
                  id="difficultyLevel"
                  name="difficultyLevel"
                  type="int"
                  value={difficultyLevel}
                  onChange={onChange}
                />
              </InputDiv>
          </InputGroup>
          <ReviewForm method="POST" onSubmit={handleSubmit}>
            <div>
              {/* <Heading>글작성</Heading> */}
            </div>
            <InputGroup>
              <InputDiv>
                {/* <InputText htmlFor="subject">제목 : </InputText> */}
                <ReviewInputTitle
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="제목"
                  value={subject}
                  onChange={onChange}
                />
              {/* </InputDiv>
            </InputGroup>
            <InputGroup>
              <InputDiv> */}
                {/* <InputText htmlFor="description">내용 : </InputText> */}
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
              <div>
                {/* <Heading>파일 첨부</Heading> */}
              </div>
              {/* <InputText htmlFor="files">files</InputText> */}
              <ReviewInput
                id="file"
                name="file"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length !==0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
             
            </InputGroup>
            <ButtonDiv>
              <SubmitButton type="submit">
                제출하기
              </SubmitButton>
              <CancelButton
              onClick={handleCancel}
              >취소</CancelButton>
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
  mt-6 text-center text-3xl font-bold tracking-tight text-gray-900
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
  block text-sm font-medium leading-6 text-gray-900
  `}
`;

const ReviewInputTitle = styled.input`
  height: 50px;
  text-indent: 10px;
  border: 1px solid rgb(220, 220, 220);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;


`;

const ReviewInputDescription = styled.input`
  height: 200px;
  border-bottom: 0;
  border: 1px solid rgb(220, 220, 220);



  &::placeholder {
    position: absolute; /* 변경 */
    top: 13px; 
    text-indent: 10px;
    font-size: 15px;
  }
`;

const ReviewInput = styled.input`
  ${tw`
  relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  `}
`


const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;

`

const SubmitButton = styled.button`
  background-color: rgb(160, 200, 70);
  color: white;
  width: 40%;
  height: 45px;
  border-radius: 10px;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: rgb(205, 205, 205);
  color: white;
  width: 40%;
  height: 45px;
  border-radius: 10px;
  margin-left: 10px;
`;
