import styled from "styled-components";
import tw from "twin.macro";
import { useReducer } from "react";
import axios from "axios";

const AdminPage = () => {
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
    thumbnail: "",
    files: "",
    category: "",
    projectSubject: "",
    projectDescription: "",
    DonationStartDate: "",
    DonationEndDate: "",
    targetAmount: "",
    DonationSubject: "",
    DonationDescription: "",
    volunteerStartDate: "",
    volunteerEndDate: "",
    difficultyLevel: "",
    location: "",
    capacityPerDate: "",
    volunteeSubject: "",
    volunteeDescription: "",
  });
  const {
    thumbnail,
    files,
    category,
    projectSubject,
    projectDescription,
    DonationStartDate,
    DonationEndDate,
    targetAmount,
    DonationSubject,
    DonationDescription,
    volunteerStartDate,
    volunteerEndDate,
    difficultyLevel,
    location,
    capacityPerDate,
    volunteeSubject,
    volunteeDescription,
  } = state;
  const adminSubmit = () => {
    let testData = {
      projectReqDto: {
        category: state.category,
        subject: state.projectSubject,
        description: state.projectDescription,
      },
      donationReqDto: {
        startDate: state.DonationStartDate,
        endDate: state.DonationEndDate,
        targetAmount: state.targetAmount,
        subject: state.DonationSubject,
        description: state.DonationDescription,
      },
      volunteerReqDto: {
        startDate: state.volunteerStartDate,
        endDate: state.volunteerEndDate,
        difficultyLevel: state.difficultyLevel,
        location: state.location,
        capacityPerDate: state.capacityPerDate,
        subject: state.volunteeSubject,
        description: state.volunteeDescription,
      },
    };
    const formData = new FormData();
    formData.append(
      "info",
      new Blob([JSON.stringify(testData)], {
        type: "application/json",
      })
    );
    formData.append("files", state.files);
    formData.append("thumbnail", state.thumbnail);
    console.log(formData);
    console.log(state.thumbnail);
    axios
      .post("/api/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        const response = error.response.data;
        console.log(response);
      });
  };
  return (
    <>
      <Container>
        <InnerContainer>
          <div>
            <Heading>Admin Page</Heading>
          </div>
          <AdminForm action="#" method="POST">
            <InputGroup>
              <div>
                <Heading>project</Heading>
              </div>
              <div>
                <InputText htmlFor="category">프로젝트 카테고리</InputText>
                <AdminInput
                  id="category"
                  name="category"
                  type="text"
                  value={category}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="subject">subject</InputText>
                <AdminInput
                  id="projectSubject"
                  name="projectSubject"
                  type="text"
                  value={projectSubject}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="projectDescription">
                  프로젝트 개요
                </InputText>
                <AdminInput
                  id="projectDescription"
                  name="projectDescription"
                  type="text"
                  value={projectDescription}
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Heading>donation</Heading>
              </div>
              <div>
                <InputText htmlFor="DonationStartDate">
                  기부 시작 날짜
                </InputText>
                <AdminInput
                  id="DonationStartDate"
                  name="DonationStartDate"
                  type="date"
                  value={DonationStartDate}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="DonationEndDate">기부 끝 날짜</InputText>
                <AdminInput
                  id="DonationEndDate"
                  name="DonationEndDate"
                  type="date"
                  value={DonationEndDate}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="targetAmount">기부 목표 금액</InputText>
                <AdminInput
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  value={targetAmount}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="DonationSubject">기부 주제</InputText>
                <AdminInput
                  id="DonationSubject"
                  name="DonationSubject"
                  type="text"
                  value={DonationSubject}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="DonationDescription">기부 개요</InputText>
                <AdminInput
                  id="DonationDescription"
                  name="DonationDescription"
                  type="text"
                  value={DonationDescription}
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Heading>volunteer</Heading>
              </div>
              <div>
                <InputText htmlFor="volunteerStartDate">
                  봉사 시작 날짜
                </InputText>
                <AdminInput
                  id="volunteerStartDate"
                  name="volunteerStartDate"
                  type="date"
                  value={volunteerStartDate}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="volunteerEndDate">봉사 마감 날짜</InputText>
                <AdminInput
                  id="volunteerEndDate"
                  name="volunteerEndDate"
                  type="date"
                  value={volunteerEndDate}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="difficultyLevel">난이도</InputText>
                <AdminInput
                  id="difficultyLevel"
                  name="difficultyLevel"
                  type="number"
                  value={difficultyLevel}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="location">봉사 장소</InputText>
                <AdminInput
                  id="location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={onChange}
                />
              </div>

              <div>
                <InputText htmlFor="capacityPerDate">봉사 모집 인원</InputText>
                <AdminInput
                  id="capacityPerDate"
                  name="capacityPerDate"
                  type="number"
                  value={capacityPerDate}
                  onChange={onChange}
                />
              </div>

              <div>
                <InputText htmlFor="volunteeSubject">봉사 주제</InputText>
                <AdminInput
                  id="volunteeSubject"
                  name="volunteeSubject"
                  type="text"
                  value={volunteeSubject}
                  onChange={onChange}
                />
              </div>
              <div>
                <InputText htmlFor="volunteeDescription">봉사개요</InputText>
                <AdminInput
                  id="volunteeDescription"
                  name="volunteeDescription"
                  type="text"
                  value={volunteeDescription}
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Heading>files</Heading>
              </div>
              <div>
                <InputText htmlFor="files">files</InputText>
                <AdminInput
                  id="files"
                  name="files"
                  type="file"
                  value={files}
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Heading>thumbnail</Heading>
              </div>
              <div>
                <InputText htmlFor="thumbnail">thumbnail</InputText>
                <AdminInput
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  value={thumbnail}
                  onChange={onChange}
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
  block text-sm font-medium leading-6 text-gray-900
  `}
`;

const AdminInput = styled.input`
  ${tw`
  relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
  
  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;

export default AdminPage;
