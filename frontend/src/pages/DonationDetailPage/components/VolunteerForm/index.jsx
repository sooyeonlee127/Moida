import axios from 'axios';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VolunteerForm = (props) => {
    const data = {
        startDate: props.data?.startDate,
        endDate: props.data?.endDate,
        difficultyLevel: props.data?.difficultyLevel,
        location: props.data?.location,
        capacityPerDate: props.data?.capacityPerDate,
        subject: props.data?.subject,
        description: props.data?.description,
        id: props.data?.id
    };
    // console.log("??", data)
    // {
    //     "startDate": "2023-03-28",
    //     "endDate": "2023-04-10",
    //     "difficultyLevel": 5,
    //     "location": "제주특별자치도 제주시 첨단로 242",
    //     "capacityPerDate": 15,
    //     "subject": "다람쥐에게 도토리를 전달해요",
    //     "description": "먹이가 필요한 다람쥐에게 도토리를 전달하는 봉사입니다",
    //     "id": 0
    // },

    // 날짜 선택 관련 - 이은혁
    const [value, onChange] = useState(new Date());
    const selectedDay = value.getDate() 
    const selectedMonth = value.getMonth() 
    const selectedYear = value.getFullYear()
    
    const ParticipateApi = () => {  // 기부 API: 기부하기 버튼 클릭 시 작동 - 이은혁
        
        axios({
            url: "/api/project/donation",
            method: "POST",
            data: {
            },
            headers: {
                "accept": "*/*",
                "Authorization": localStorage.getItem("accessToken"),
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    } 
    
    return (
        <div>
            <p>{data.subject}</p>
            <p>기간 : {data.startDate} ~ {data.endDate}</p>
            <p>난이도 : {data.difficultyLevel}</p>
            <p>모집 인원 : {data.capacityPerDate}</p>
            <p>장소 : {data.location}</p>
            <p>설명 : {data.description}</p>
            <p>봉사 희망일 선택</p>
            <Calendar onChange={onChange} value={value} />
            <p>봉사 희망일 : {selectedYear}년 {selectedMonth}월 {selectedDay}일</p>
            <button>지원하기</button>
        </div>
    )
}


export default VolunteerForm;