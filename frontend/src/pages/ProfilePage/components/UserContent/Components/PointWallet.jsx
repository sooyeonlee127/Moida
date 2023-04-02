import React, { useState, useEffect } from 'react';
import useListApi from "./api";
import styled from 'styled-components';
import Paging from '../../../../../components/Pagination/Paging'

const PointWallet = () => {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    // const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
    const [category, setCategory] = useState("ALL") // 페이지 번호들을 담을 리스트 생성
    const { data: datas, length, error, loading } = useListApi("points", pageNum, pageSize, category) // length는 페이지네이션 활용 용도 - 이은혁
    
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
    //   console.log("datas", datas)
    // }, [length])
    
    return (
        <>
        <div className="container">
         {datas?.map((data, index) => { 
            // 날짜 형식 변경 - 이은혁
            const date = new Date(data.pointDate)
            const year = String(date.getFullYear()).slice(2,4)
            const tmpM = String(date.getMonth()+1)
            const tmpD = String(date.getDate())
            const month = tmpM.length===1 ? "0"+tmpM : tmpM;
            const day = tmpD.length===1 ? "0"+tmpD : tmpD;
            
            console.log(data.regDate, year, month, day)
            return (
            <div className="item" key={index}>
                <p>{datas.length === 0 && !loading? "빈 값":""}</p>
                <div className="item_sec">
                    <img className='badge' src="" alt="" />   
                </div>
                <div className="item_sec grow_sec">
                    {data.category==='DONATION'? (<p className="weak"><span>[{data.generation}차] {data.projectSubject}</span></p>):""}
                    <p className="title mb-1">
                        {data.category==='DONATION'? "기부":"충전"}
                    </p>
                    <p className="weak">{year+"."+month+"."+day}</p>
                </div>
                <div className="item_sec w-2">
                    {data.category==='DONATION'? 
                    (<p className='strong'>- {data.points}P</p>):
                    (<p className='strong'>+ {data.points}P</p>)}
                    
                </div>
                <div className="item_sec w-2">
                    <p className="weak">받은 티켓</p>
                    <p className="strong">{data.ticketCnt}개</p>
                </div>
            </div>
         )})
        }
        </div>
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
        {/* <div className='group_pagebtn'> 
            {pageList?.map((num, index)=>{ 
                return (
                    <button className={pageNum===num? "pagebtn current":"pagebtn"} key={index} onClick={()=> setPageNum(num)}>{num}</button>) 
            })}
        </div> */}
        <Paging page={pageNum} totalItem={length} setPage={(e)=>setPageNum(e)}/>
        </>
    )
}


export default React.memo(PointWallet);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁