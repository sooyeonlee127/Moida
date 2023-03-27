import React from 'react';
import useListApi from "./api"

const DonationList = () => {
    const { data: datas, error, loading } = useListApi("donation")
    console.log(datas)
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>프로젝트 차수</th>
                    <th>기부한 금액</th>
                    <th>프로젝트 id</th>
                    <th>프로젝트 제목</th>
                    <th>기부한 날짜</th>
                    <th>내가 받은 티켓</th>
                </tr>
            </thead>
            <tbody>
                {datas.map((data, index) => { 
                    return (
                        <tr key={index}>
                            <td>{data.generation}</td>
                            <td>{data.point}</td>
                            <td>{data.projectId}</td>
                            <td>{data.projectSubject}</td>
                            <td>{data.regDate}</td>
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

export default React.memo(DonationList);
// React.memo() <== 상위 컴포넌트에서 state 사용 시 리렌더링되는 것 방지하기 위함 - 이은혁