import axios from 'axios';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VolunteerForm = () => {
    const [value, onChange] = useState(new Date());
    const day = value.getDate() 
    const month = value.getMonth() 
    const year = value.getFullYear()
    
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
            <p>Title</p>
            <div>Content</div>
            <p>Location</p>
            <p>봉사 희망일 선택</p>
            <Calendar onChange={onChange} value={value} />
            <p>봉사 희망일 : {year}년 {month}월 {day}일</p>
            <button>지원하기</button>
        </div>
    )
}


export default VolunteerForm;