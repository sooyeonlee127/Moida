import React from 'react';
import useListApi from "./api"
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const DonationList = () => {
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [pageList, setPageList] = useState([]) // 페이지 번호들을 담을 리스트 생성
    const { data: datas, length, error, loading } = useListApi("donation", pageNum, pageSize) // length는 페이지네이션 활용 용도 - 이은혁
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
    }, [length])
    
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>프로젝트 차수</th>
                    <th>기부한 모이</th>
                    <th>프로젝트 id</th>
                    <th>프로젝트 제목</th>
                    <th>기부한 날짜</th>
                    <th>내가 받은 티켓</th>
                </tr>
            </thead>
            <tbody>
                {datas?.map((data, index) => { 
                    return (
                        <tr key={index}>
                            <td>{data.generation}</td>
                            <td>{data.moi}</td>
                            <td>{data.projectId}</td>
                            <td>{data.projectSubject}</td>
                            <td>{data.regDate}</td>
                            <td>{data.ticketCnt}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
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

export default React.memo(DonationList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁