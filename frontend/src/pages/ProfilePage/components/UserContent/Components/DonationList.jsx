import React from 'react';
import useListApi from "./api"
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paging from '../../../../../components/Pagination/Paging'
import "./Tab.css";

const DonationList = () => {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
    const { data: datas, length, error, loading } = useListApi("donation", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
   
    // const Pagination = () => {
    //     const lastPage = parseInt((length+5)/pageSize) || 1 // 데이터 개수가 한 페이지 분량보다 작은경우에도 1이 뜨도록 처리 - 이은혁
    //     const tmp = []
    //     for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
    //         tmp.push(i)
    //     }
    //     setPageList(tmp)
    // }
    // useEffect(() => {
    //   Pagination()
    // }, [length])
    
    return (
        <>
        <div className='container'>
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
                        <p className="weak">기부한 날짜 : {year+"."+month+"."+day}</p>
                    </div>
                    <div className="item_sec w-2">
                        <p className="weak">내가 받은 티켓</p>
                        <p className="strong">{data.ticketCnt}장</p>
                    </div>
                    <div className="item_sec w-2">
                        <p className="weak">기부한 모이</p>
                        <p className="strong">{data.moi}개</p>
                    </div>
                </div>
            )
        })}
        </div>
        {/* <div className='group_pagebtn'> 
          {pageList?.map((num, index)=>{ return (<button className="pagebtn" key={index} onClick={()=> setPageNum(num)}>{num}</button>) })}
        </div> */}
           <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/> 
        </>
    )
}

export default React.memo(DonationList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁