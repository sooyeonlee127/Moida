import styled from "styled-components";
import tw from "twin.macro";
import DonationForm from "./components/DonationForm";
import VolunteerForm from "./components/VolunteerForm";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const DonationDetailPage = () => {
  const { projectId } = useParams(); // const 변수명 = useParams().파라미터명 - 이은혁
  const [tabIndex, setTabIndex] = useState(0); // 0: 기부, 1: 봉사 - 이은혁
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true)

    // id: "",         // 프로젝트 id
    // category: "",   // 분류
    // subject: "",    // 주제
    // generation: "", // 차수
    // thumbnail: "",  // 썸네일
    // description: "",// 설명
    // pictures: "",   // 사진 url
    // pointPerMoi: "" // 모이 1개 당 포인트

    
    const GetInfoApi = async () => {
        try{
            setIsLoading(true)
            const response = await api({
                url: "/project/"+projectId,
                method: "GET",
                headers: {
                    accept: "*/*",
                    Authorization: localStorage.getItem("accessToken")
                }
            })
            setIsLoading(false)
            console.log(response.data)
            return response.data;
        } 
        catch (error) {
            setIsLoading(false)
            console.error(error);
            return error;
        }
    }
    const { data: projectInfo, refetch } = useQuery({
        queryKey: ["GetInfo"],
        queryFn: GetInfoApi,
        refetchOnMount: true,
    });
    
    return (
        <Wrapper>
            <Main>
              <MainImage thumbnail={!isLoading? projectInfo?.thumbnail : ""}/>
                <Aside>
                    <TabGroup>
                        <Tab className={tabIndex===0 ? "active":""} onClick={ () => setTabIndex(0) }>기부하기</Tab>
                        <Tab className={tabIndex===1 ? "active":""} onClick={ () => setTabIndex(1) }>봉사하기</Tab>
                    </TabGroup>
                    <Div>
                    { tabIndex===1 ? <VolunteerForm data={projectInfo?.volunteerResDto}/> : <DonationForm gen={projectInfo?.generation} data={projectInfo?.donationResDto} pointPerMoi={projectInfo?.projectReqDto?.pointPerMoi}/>}
                    </Div>
                </Aside>
            </Main>
            <Article>
                <Content>
                    <InnerContent>
                        <SectionTab>상세보기</SectionTab>
                        <DetailContent>
                          <p>{projectInfo?.projectReqDto.subject}</p>
                          <p>{projectInfo?.projectReqDto.description}</p>
                          {projectInfo?.pictures}
                        </DetailContent>
                    </InnerContent>
                </Content> 
            </Article>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Main = styled.div`
  position: relative;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: left;
  margin-bottom: 50px;
  & > div {
    display: inline-block;
  }
`;

const MainImage = styled.div`
height: 400px;
width: 580px;
box-shadow: 3px 5px 20px rgba(0,0,0,15%);
border-radius: 10px;
background-image: url(${(props) => props.thumbnail});
background-size: cover;
`

const Aside = styled.div`
  background: white;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 15%);
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  margin-left: 20px;
`;
const TabGroup = styled.div`
  border-color: black;
  display: flex;
  flex-direction: row;
  ${tw`divide-x`}
`;

const Tab = styled.button`
  flex-basis: 50%;
  padding: 13px 5px;
  background: #a0c846;
  color: #fff;
  &:first-child {
    border-top-left-radius: 10px;
    box-shadow: inset -10px 1px 5px -5px #00000040;
    border-bottom-right-radius: 20px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    box-shadow: inset 10px 1px 5px -5px #00000040;
    border-bottom-left-radius: 20px;
  }
  &.active {
    background-color: #ffffff;
    box-shadow: none;
    color: #a0c846;
    font-weight: 600;
  }
  &:hover {
    background: #a9d34b;
  }
  &.active:hover {
    background-color: #efefef;
  }
`;
const Div = styled.div`
  padding: 15px 30px 30px 30px;
`;

const Article = styled.div`
  margin: 20px 0;
  width: 100%;
  border-top: 1px solid #0000001f;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Content = styled.div`
  // background-color: lightgrey;
  min-height: 500px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
`;
const InnerContent = styled.div`
  position: relative;
`;
const SectionTab = styled.div`
  top: 0px;
  left: 0px;
  position: absolute;
  display: inline-block;
  padding: 10px 60px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgb(160, 200, 70);
  color: white;
`;
const DetailContent = styled.div`

`
const Box = styled.div`
  position: absolute;
  top: 10px;
  left: 1px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: end;
  ${tw`
  my-5 mx-10
  `}
`;

const AdminButton = styled.button`
  background-color: rgb(160, 200, 70);
  ${tw`
  rounded-sm px-3 py-1 mx-1
  `}
`;

export default DonationDetailPage;
