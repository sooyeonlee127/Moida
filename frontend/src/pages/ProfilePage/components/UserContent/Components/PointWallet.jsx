import React from 'react';
import useListApi from "./api";

const PointWallet = () => {
    const { data: datas, error, loading } = useListApi("points")
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>분류</th>
                    <th>프로젝트 차수</th>
                    <th>포인트 적립/사용일</th>
                    <th>포인트</th>
                    <th>주제</th>
                    <th>받은 티켓</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((data, index) => { 
                    return (
                        <tr key={index}>
                            <td>{data.category}</td>
                            <td>{data.generation}</td>
                            <td>{data.pointDate}</td>
                            <td>{data.points}</td>
                            <td>{data.projectSubject}</td>
                            <td>{data.ticketCnt}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
            
        </>
    )
}

export default React.memo(PointWallet);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁