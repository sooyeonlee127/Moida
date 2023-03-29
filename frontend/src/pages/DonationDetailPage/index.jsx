import styled from "styled-components"
import tw from "twin.macro"
import DonationForm from "./components/DonationForm"
import VolunteerForm from "./components/VolunteerForm"
import { useState } from "react"
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import api from "../../api/auth"

const DonationDetailPage = () => {
    const { projectId } = useParams(); // const 변수명 = useParams().파라미터명 - 이은혁
    const [ tabIndex, setTabIndex ] = useState(0); // 0: 기부, 1: 봉사 - 이은혁

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
            const response = await api({
                url: "/project/"+projectId,
                method: "GET",
                headers: {
                    accept: "*/*",
                    Authorization: localStorage.getItem("accessToken")
                }
            })
            return response.data;
        } 
        catch (error) {
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
        <div>
            <Main>
                <MainImage />
                <Aside>
                    <TabGroup>
                        <Tab onClick={ () => setTabIndex(0) }>기부하기</Tab>
                        <Tab onClick={ () => setTabIndex(1) }>봉사하기</Tab>
                    </TabGroup>
                    { tabIndex===1 ? <VolunteerForm data={projectInfo?.volunteerResDto}/> : <DonationForm data={projectInfo?.donationResDto} pointPerMoi={projectInfo?.projectReqDto.pointPerMoi}/>}
                </Aside>
            </Main>
            <Article>
                <p>{projectId}번째</p>
                <Content></Content> 
            </Article>
        </div>
    )
}

const Main = styled.div`
padding-top: 50px;
max-width: 1200px;
${tw`flex flex-row space-x-5 mx-auto`}
`

const MainImage = styled.div`
height: 500px;
${tw`basis-3/5 bg-cover bg-[url('https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/')]`}
`

const Aside = styled.div`
${tw`border basis-2/5`}
`
const TabGroup = styled.div`
border-color: black;
${tw`flex flex-row ring-1 ring-current divide-x`}
`

const Tab = styled.button`
${tw`basis-1/2 px-2 py-3 hover:bg-sky-500 active:bg-sky-600`}
`



const Article = styled.div`
margin: 20px 0;
border-top: 1px solid black;
${tw``}
`

const Content = styled.div`
background-color: grey;
min-height: 500px;
box-sizing: border-box;
${tw`container mx-auto`}
`

export default DonationDetailPage