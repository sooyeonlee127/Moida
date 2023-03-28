import styled from "styled-components";
import tw from "twin.macro";
import { useReducer, useState } from "react";
import axios from "axios";

// 수연: 프로젝트 생성 페이지
const ProjectCreatePage = () => {
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
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [state, onChange] = useInputs({
    category: "",
    projectSubject: "",
    projectDescription: "",
    pointPerMoi: "",
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
    category,
    projectSubject,
    projectDescription,
    pointPerMoi,
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
        pointPerMoi: state.pointPerMoi,
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
    formData.append("files", files);
    formData.append("thumbnail", thumbnail);
    console.log(formData);
    console.log(state.thumbnail);
    axios
      .post("/api/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("accessToken"),
          refresh: localStorage.getItem("refreshToken"),
        },
      })
      .then((res) => {
        console.log(res);
        alert("프로젝트 생성 완료했습니다.");
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
            <Heading>관리자 페이지</Heading>
          </div>
          <AdminForm action="#" method="POST">
            <InputGroup>
              <div>
                <Title>project</Title>
              </div>
              <div>
                <InputText htmlFor="category">
                  프로젝트 카테고리( SQUIRREL / CRANE / WILD_ANIMAL )
                </InputText>
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
                <AdminLargeInput
                  id="projectDescription"
                  name="projectDescription"
                  type="text"
                  rows="4"
                  value={projectDescription}
                  onChange={onChange}
                ></AdminLargeInput>
              </div>
              <div>
                <InputText htmlFor="pointPerMoi">pointPerMoi</InputText>
                <AdminInput
                  id="pointPerMoi"
                  name="pointPerMoi"
                  type="number"
                  value={pointPerMoi}
                  onChange={onChange}
                />
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Title>donation</Title>
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
                <AdminLargeInput
                  id="DonationDescription"
                  name="DonationDescription"
                  type="text"
                  rows="4"
                  value={DonationDescription}
                  onChange={onChange}
                ></AdminLargeInput>
              </div>
            </InputGroup>
            <InputGroup>
              <div>
                <Title>volunteer</Title>
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
                <AdminLargeInput
                  id="volunteeDescription"
                  name="volunteeDescription"
                  type="text"
                  rows="4"
                  value={volunteeDescription}
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
            <InputGroup>
              <div>
                <Title>thumbnail</Title>
              </div>
              <div>
                <InputText htmlFor="thumbnail">thumbnail</InputText>
                <AdminInput
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) {
                      setThumbnail(e.target.files[0]);
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

const AdminLargeInput = styled.textarea`
  ${tw`
  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  `}
`;

const SubmitButton = styled.button`
  ${tw`
  w-full h-full bg-yellow-600 py-2 px-10 font-semibold text-black
  `}
`;

export default ProjectCreatePage;
