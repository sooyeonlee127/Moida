import styled from "styled-components";
import tw from "twin.macro";
import { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/auth";
import { useState } from "react";

// 혜수: 사용자 인증글 수정 페이지
const ReviewUpdatePage = () => {
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

  const [cancel, setCancel] = useState(false);
  const { reviewid } = useParams(); // 인증글 id로 접근
  const [state, onChange] = useInputs({
    subject: "",
    description: "",
  });
  const { subject, description } = state;

  const reviewSubmit = () => {
    console.log(subject, description, reviewid);
    let data = {
      id: reviewid,
      subject: subject,
      description: description,
    };
    console.log("formData", data);
    api
      .put("/article", data, {
        headers: {
          id: reviewid,
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        console.log(res);
        alert("인증글 수정 완료했습니다.");
        navigate(`/review/${reviewid}`);
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
    navigate(`/review/${reviewid}`);
  };
  return (
    <>
      <Container>
        <InnerContainer>
          <div>
            <Heading>리뷰 수정하기</Heading>
            <hr></hr>
          </div>
          {/* <AdminForm action="#" method="POST"> */}
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
                rows="4"
                placeholder="내용"
                value={description}
                onChange={onChange}
              />
            </InputDiv>
          </InputGroup>
          <ButtonDiv>
            <SubmitButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                reviewSubmit();
              }}
            >
              제출하기
            </SubmitButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonDiv>
          {/* </AdminForm> */}
        </InnerContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${tw`
  flex min-h-full items-center justify-center sm:px-6 lg:px-8 
  `}
`;

const InnerContainer = styled.div`
  ${tw`
   w-full max-w-md mt-8 px-3 py-3
  `}
`;

const Heading = styled.h2`
  ${tw`
  mt-6 text-center text-3xl font-semibold tracking-tighter text-gray-900
  `}
  margin-bottom: 20px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

const InputGroup = styled.div`
  ${tw`
  -space-y-px rounded-lg shadow-sm
  `}
  margin-top: 30px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
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
export default ReviewUpdatePage;
