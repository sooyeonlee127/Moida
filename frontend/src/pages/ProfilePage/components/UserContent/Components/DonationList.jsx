import useListApi from "./api"

const DonationList = () => {
    const { data: datas, error, loading } = useListApi("donation")
    console.log(datas)
    return (
        <>
        <table>
            {datas.map((data, index) => { 
                console.log(data)
                return (
                    <tr key={index}>
                        <td>프로젝트 차수 : {data.generation}</td>
                        <td>기부한 금액 : {data.point}</td>
                        <td>프로젝트 id : {data.projectId}</td>
                        <td>프로젝트 제목 : {data.projectSubject}</td>
                        <td>기부한 날짜 : {data.regDate}</td>
                        <td>내가 받은 티켓 : {data.ticketCnt}</td>
                    </tr>
                )
            })}
        </table>
        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
            
        </>
    )
}

export default DonationList;