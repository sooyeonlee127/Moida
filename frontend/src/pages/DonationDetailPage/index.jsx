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
        <Wrapper>
            <Main>
                <MainImage />
                <Aside>
                    <TabGroup>
                        <Tab className={tabIndex===0 ? "active":""} onClick={ () => setTabIndex(0) }>기부하기</Tab>
                        <Tab className={tabIndex===1 ? "active":""} onClick={ () => setTabIndex(1) }>봉사하기</Tab>
                    </TabGroup>
                    <Div>
                    { tabIndex===1 ? <VolunteerForm data={projectInfo?.volunteerResDto}/> : <DonationForm data={projectInfo?.donationResDto} pointPerMoi={projectInfo?.projectReqDto.pointPerMoi}/>}
                    </Div>
                </Aside>
            </Main>
            <Article>
                <p>{projectId}번째</p>
                <Content></Content> 
            </Article>
        </Wrapper>
    )
}
const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`
const Main = styled.div`
max-width: 1000px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: left;
& > div {
    display: inline-block;
}
`

const MainImage = styled.div`
height: 400px;
width: 580px;
box-shadow: 3px 5px 20px rgba(0,0,0,15%);
border-radius: 10px;
${tw`bg-[url('https://thumb.mt.co.kr/06/2021/02/2021022514598215872_1.jpg/dims/optimize/')]`}
`

const Aside = styled.div`
background: white;
box-shadow: 3px 5px 20px rgba(0,0,0,15%);
border-radius: 10px;
max-width: 400px;
width: 100%;
margin-left: 20px;
`
const TabGroup = styled.div`
border-color: black;
display: flex;
flex-direction: row;
${tw`divide-x`}
`

const Tab = styled.button`
flex-basis: 50%;
padding: 13px 5px;
background: #A0C846;
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
    color: #A0C846;
    font-weight: 600;
}
&:hover {
    background: #a9d34b;
}
&.active:hover {
    background-color: #efefef;
}
`
const Div = styled.div`
padding: 15px 30px 30px 30px;
`

const Article = styled.div`
margin: 20px 0;
width: 100%;
border-top: 1px solid black;
`

const Content = styled.div`
background-color: grey;
min-height: 500px;
box-sizing: border-box;
${tw`container mx-auto`}
`

export default DonationDetailPage