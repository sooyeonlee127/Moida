import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VolunteerForm = (props) => {
    const data = {
        startDate: props?.data.startDate,
        endDate: props?.data.endDate,
        difficultyLevel: props?.data.difficultyLevel,
        location: props?.data.location,
        capacityPerDate: props?.data.capacityPerDate,
        subject: props?.data.subject,
        description: props?.data.description,
        id: props?.data.id,
        dates: props?.data.dates
    };
    const { dates } = props.data;

    
    const dateMap = {}; // 날짜를 키값으로 하는 객체 생성 - 이은혁
    for (const dateObj of dates) {
      dateMap[dateObj.date] = {
        id: dateObj.id,
        capacity: dateObj.capacity,
        maxCapacity: dateObj.maxCapacity
      };
    }
  

    // 날짜 선택 관련 - 이은혁
    const [value, onChange] = useState(); // 달력에서 현재 선택한 날짜를 담는 state - 이은혁
    const [stringValue, setStringValue] = useState();

    useEffect(()=> {    // 
        const d = new Date(value)
        setStringValue(dateFormat(d))
        // console.log(dateMap[dateFormat(d)])
    }, [value])

    const selectedDay = value?.getDate()
    const selectedMonth = value?.getMonth()
    const selectedYear = value?.getFullYear()
    

    const disableTile = (date)=> { // maxCapacity와 capacity를 이용해 해당 날짜가 사용 가능한지 판별하는 함수 - 이은혁
        const key = dateFormat(date) // yyyy_mm_dd 로 변환 - 이은혁
        const res = dateMap[key]
        if (res && res?.capacity>= res?.maxCapacity) return true
        return false
    }


    function dateFormat(date) { // yyyy-mm-dd로 변환하는 함수 - 이은혁
        let dateFormat2 = date.getFullYear() +
            '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
            '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
        return dateFormat2;
    }

    const ParticipateApi = () => {  // 기부 API: 기부하기 버튼 클릭 시 작동 - 이은혁
        console.log("axios 요청")
        const id = String(dateMap[dateFormat(value)].id)
        axios({
            url: "/api/project/volunteer",
            method: "POST",
            params: {
                vDateInfoId: id
            },
            headers: {
                "accept": "*/*",
                "Authorization": localStorage.getItem("accessToken"),
            }
        })
        .then((res) => {
            console.log(res.data)
            alert("봉사 신청이 완료되었습니다.")
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
            <Calendar onChange={onChange} tileDisabled={({date})=> disableTile(date)} value={value}	minDate={new Date(data.startDate)} maxDate={new Date(data.endDate)} disableTile/>
            <p>봉사 희망일 : {selectedYear}년 {selectedMonth}월 {selectedDay}일</p>
            <p>capacity : {dateMap[stringValue]?.capacity}</p>
            <p>maxCapacity : {dateMap[stringValue]?.maxCapacity}</p>
            <button onClick={ParticipateApi}>지원하기</button>
        </div>
    )
}


export default VolunteerForm;