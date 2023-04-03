import React, { useEffect, useState } from 'react';
import useListApi from "./api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paging from '../../../../../components/Pagination/Paging'
import "./volunteerList.css";


const VolunteerList = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data:datas, length, error, loading } = useListApi("volunteer", pageNum, pageSize)
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [doneId, setDoneId] = useState();
  const navigate = useNavigate();

  // 취소코드
  const volunteerCancel = async (cancelId) => {
    await axios
    .put("/api/users/me/volunteer", {
      volunteerId: cancelId,
      status: "CANCEL",
    }, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      }
    })
    .then((res) => {
      console.log(res)
      alert("취소되었습니다.")
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
  }



  //완료코드
  const volunteerDone = async (value, doneId) => {
    try {
    const res = await axios
    .put("/api/users/me/volunteer", {
      volunteerId: doneId,
      status: "DONE",
      code: value,
    }, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
      }
    })
    if (res) {
      console.log(res)
      alert("완료되었습니다.")
      setVisible(!visible);
    }

    } catch(error) {
      console.log(error.response.data.message)
      alert("인증코드가 다릅니다.")
    }
  }
  // const Pagination = () => {
  //   const lastPage = parseInt((length+5)/pageSize) || 1 // 데이터 개수가 한 페이지 분량보다 작은경우에도 1이 뜨도록 처리 - 이은혁
  //   const tmp = []
  //   for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
  //       tmp.push(i)
  //   }
  //   setPageList(tmp)
  // }
  // useEffect(() => {
  //   Pagination()
  // }, [length])

  

  // 오늘 날짜 얻어오기 - 이은혁
  const today = new Date()
  const todayYear = String(today.getFullYear())
  const tmpTodayM = String(today.getMonth()+1)
  const tmpTodayD = String(today.getDate())
  const todayMonth = tmpTodayM.length===1 ? "0"+tmpTodayM : tmpTodayM;
  const todayDay = tmpTodayD.length===1 ? "0"+tmpTodayD : tmpTodayD;

  return (
    <>
      {visible && 
      <form >
        <input id="Atcode" value={value} onChange={(e)=>setValue(e.target.value)} type="text" placeholder='코드를 입력하세요'/>
        <button type="submit" onClick={(e) => {e.preventDefault(); volunteerDone(value,doneId); setValue("");}}>확인</button>
      </form>}

      <div className="container">
        {datas?.map((data, index) => { 
          // 날짜 형식 변경 - 이은혁
          const date = new Date(data.regDate)
          const year = String(date.getFullYear()).slice(2,4)
          const tmpM = String(date.getMonth()+1)
          const tmpD = String(date.getDate())
          const month = tmpM.length===1 ? "0"+tmpM : tmpM;
          const day = tmpD.length===1 ? "0"+tmpD : tmpD;

          return (
          <div className="item" key={index}>
              <p>{datas.length === 0 && !loading? "빈 값":""}</p>
              <div className="item_sec">
                  <img className='badge' src="" alt="" />   
              </div>
              <div className="item_sec grow_sec">
                <p className="weak">{data.generation}차 프로젝트</p>
                <p className="title mb-1"><Link className="link" to={`/donation/`+data.projectId}>{data.projectSubject}</Link></p>
              </div>
              <div className="item_sec w-2">
                <p className="weak">봉사 신청일</p>
                <p className="strong">{year+"."+month+"."+day}</p>
              </div>
              <div className="item_sec w-1">
                <p className="weak">
                  {data.status==="REGISTER"?"신청 완료":""}
                  {data.status==="CANCEL"?"취소됨":""}
                  {data.status==="DONE"?"봉사 완료":""}
                  {data.status==="WRITTEN"?"":""}
                  {data.status==="WRITTEN_DELETE"?"리뷰 삭제됨":""}
                </p>
              </div>
              <div className="item_sec w-2">
                {data.status==="REGISTER"&& year+month+day === todayYear+todayMonth+todayDay ? (
                  <button onClick={()=>{setVisible(!visible); setDoneId(data.volunteerId)}} className='btn attend'>출석하기</button>
                ):""}
                {data.status==="REGISTER"? (<button className='btn' onClick={()=>volunteerCancel(data.volunteerId)}>취소하기</button>):""}
                {data.status==="CANCEL"?"":""}
                {data.status==="DONE"? (
                  <button className='btn' onClick={()=>navigate("/review/create")}>리뷰 쓰기</button>
                ):""}
                {data.status==="WRITTEN"? (
                  <button className='btn' onClick={()=>{navigate("/review/"+ data.articleId,{state:{volunteerId: data.volunteerId,projectId : data.projectId}})}}>내가 쓴 리뷰</button>
                ):""}
                {data.status==="WRITTEN_DELETE"?"":""}
                {/* <p className="weak">봉사 아이디 : {data.volunteerId}</p> */}
              </div>
          </div>
        )})
      }
      </div>
      {/* <div className='group_pagebtn'> 
        {pageList?.map((num, index)=>{ return (<button className="pagebtn" key={index} onClick={()=> setPageNum(num)}>{num}</button>) })}
      </div> */}
      <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/>
    </>
  )
}

export default React.memo(VolunteerList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁


