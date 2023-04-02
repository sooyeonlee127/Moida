import React, { useState, useEffect } from 'react';
import useListApi from "./api";
import styled from 'styled-components';

const PointWallet = () => {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
    const { data: datas, length, error, loading } = useListApi("points", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
    const Pagination = () => {
        const lastPage = parseInt((length+5)/pageSize) || 1 // 데이터 개수가 한 페이지 분량보다 작은경우에도 1이 뜨도록 처리 - 이은혁
        const tmp = []
        for (let i=1; i<=lastPage; i++) { // 데이터 갯수에 맞게 페이지 목록에 번호 추가 - 이은혁
            tmp.push(i)
        }
        setPageList(tmp)
    }
    useEffect(() => {
      Pagination()
      console.log("datas", datas)
    }, [length])
    
    return (
        <>
         {datas?.map((data, index) => { 
        <div className="item" key={index}>
            <div className="item_sec">
                <img className='badge' src="" alt="" />   
            </div>
            <div className="item_sec grow_sec">
                <p className="weak">{data.generation}차 프로젝트</p>
                <p className="title">프로젝트 명 : {data.projectSubject}</p>
                {/* <p className="weak">기부한 날짜 : {year+"."+month+"."+day}</p> */}
            </div>
            <div className="item_sec">
                <p className="weak">적립/사용일</p>
                <p className="strong">{data.pointDate}</p>
            </div>
            <div className="item_sec">
                <p className="strong">{data.points} Point</p>
            </div>
            <div className="item_sec">
                <p className="weak">기부한 모이</p>
                <p className="strong">{data.moi}개</p>
            </div>
        </div>
        })}
        {/* <table>
            <tbody>
                {datas?.map((data, index) => { 
                return (
                <tr key={index}>
                <td>분류(기부/적립){data.category}</td>
                <td>프로젝트 차수{data.generation}</td>
                <td>포인트 적립/사용일{data.pointDate}</td>
                <td>포인트{data.points}</td>
                <td>주제{data.projectSubject}</td>
                <td>받은 티켓{data.ticketCnt}</td>
                </tr>
                )
                })}
            </tbody>
        </table> */}
        <p> 
            {datas?.length === 0 && !loading? "빈 값":""}
            {loading? "로딩 중":""}
            {pageList?.map((num, index)=>{ return (<PageBtn key={index} onClick={()=> setPageNum(num)}>{num}</PageBtn>) })}
            </p>
        </>
    )
}

const PageBtn = styled.button`
margin: 0 10px;
padding: 5px 10px;
border: 1px solid black;
background-color: red;
`

export default React.memo(PointWallet);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁