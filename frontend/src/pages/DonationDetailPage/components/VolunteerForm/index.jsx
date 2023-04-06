import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../../../common/style/calendar.css';
import styled from 'styled-components';
import { IoPeopleOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go"

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
    const today = new Date()
    const selectedYear = value?.getFullYear() || today.getFullYear()
    const selectedMonth = value?.getMonth()+1 || today.getMonth()+1
    const selectedDay = value?.getDate() || today.getDate()
    

    const disableTile = (date)=> { // maxCapacity와 capacity를 이용해 해당 날짜가 사용 가능한지 판별하는 함수 - 이은혁
        const key = dateFormat(date) // yyyy_mm_dd 로 변환 - 이은혁
        const res = dateMap[key]
        if (res && res?.capacity>= res?.maxCapacity) return true
        if (key < dateFormat(today)) return true
        if (dates.includes(date)) return true
        return false
    }


    function dateFormat(date) { // yyyy-mm-dd로 변환하는 함수 - 이은혁
        let res = date?.getFullYear() +
            '-' + ( (date?.getMonth()+1) < 10 ? "0" + (date?.getMonth()+1) : (date?.getMonth()+1))+
            '-' + ( (date?.getDate()) < 10 ? "0" + (date?.getDate()) : (date?.getDate()) );
            // console.log(data)
        return res;
    }

    const ParticipateApi = () => {  // 기부 API: 기부하기 버튼 클릭 시 작동 - 이은혁
        // console.log("axios 요청 :"+dateFormat(value))
        if (!value) {
            alert("날짜를 선택해주세요.");
            return
        }
        const id = String(dateMap[dateFormat(value)]?.id)
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
            alert("봉사 신청이 완료되었습니다.")
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
    }

    return (
        <div>
            {/* <Text className="dday size-4 weight-9 left color-3">디데이</Text> */}
            <Text className="left weight-2 size-2">난이도 : {data.difficultyLevel}</Text>
            <Div className="mb-1">
                <Text className="size-5 weight-6 left color-3">{data.subject}</Text>
                <Text className="size-1 weight-2 left color-3 period">
                    {new Date(data.startDate).getFullYear()}년 {new Date(data.startDate).getMonth()+1}월 {new Date(data.startDate).getDate()}일 ~ 
                    {new Date(data.endDate).getFullYear()}년 {new Date(data.endDate).getMonth()+1}월 {new Date(data.endDate).getDate()}일
                </Text>
            </Div>
            <Text className="size-2 weight-2 left color-3">{data.description}</Text>
            <Div className='mb-2 mt-1'>
                <Text className="left">
                    <IoPeopleOutline size="20px" style={{display: "inline-block", marginRight: "8px"}}/>
                    <Text className="weight-2 size-2 span">모집 인원 <span style={{marginLeft: "5px"}}>{data.capacityPerDate}</span>명</Text>
                </Text>
                <Text className="left">
                    <GoLocation size="20px" style={{display: "inline-block", marginRight: "8px"}}/>
                    <Text className="weight-2 size-2 location span">위치<a href={`https://maps.naver.com/v5/search/`+data.location} target='blank'>{data.location}</a></Text>
                </Text>
            </Div>
            <Text className="left weight-6 size-3">봉사 희망일 선택</Text>
            <Calendar onChange={onChange} tileDisabled={({date})=> disableTile(date)} value={value}	minDate={new Date(data.startDate)} maxDate={new Date(data.endDate)} disableTile/>
            <Text className="expected_date">
                <span><span style={{marginRight:"1.3rem"}}>희망일</span>{selectedYear}년 {selectedMonth}월 {selectedDay}일</span>
                <span>{dateMap[stringValue]?.capacity}/{dateMap[stringValue]?.maxCapacity} 명</span>
            </Text>
            <Button onClick={ParticipateApi}>지원하기</Button>
        </div>
    )
}
const Div = styled.div`
& > .period {
    margin: 2px 0 13px 0;
  }
&.mt-1{
    margin-top: 0.7rem;
}
&.mt-2{
    margin-top: 1.3rem;
}
&.mb-1{
    margin-bottom: 0.7rem;
}
&.mb-2{
    margin-bottom: 1.3rem;
}
`
const Text = styled.p`
color: #594949;
&.expected_date {
    border: 1px solid #EDEDED;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 5px 25px;
    background: #FBEAEA;
    color: #791F1F;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
&.location>a {
    color: #0093D2;
    margin-left: 10px;
    font-weight: 700;
}
&.location>a:hover {
    text-decoration: underline;
}
&.dday {
  color: #DC653F;
}
&.center {
text-align: center; 
}
&.left {
text-align: left;
}
&.right {
text-align: right;
}
&.weight-9 {
font-weight: 900;
}
&.weight-6 {
font-weight: 600;
}
&.weight-5 {
font-weight: 500;
}
&.weight-2 {
font-weight: 200;
}
&.size-6 {
font-size: 1.5rem;
}
&.size-5 {
font-size: 1.35rem;
}
&.size-4 {
font-size: 1.2rem;
}
&.size-3 {
font-size: 1rem;
}
&.size-2 {
font-size: 0.9rem;
}
&.size-1 {
font-size: 0.85rem;
}
&.span {
display: inline-block;
}
`
const Button = styled.button`
padding: 10px;
background: rgb(160, 200, 70);
color: white;
width: 100%;
border-radius: 10px;
margin-top: 25px;
`

export default VolunteerForm;