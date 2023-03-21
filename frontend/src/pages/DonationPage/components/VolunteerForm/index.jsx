import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VolunteerForm = () => {
    const [value, onChange] = useState(new Date());
    const day = value.getDate() 
    const month = value.getMonth() 
    const year = value.getFullYear() 
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