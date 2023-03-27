import useListApi from "./api"

const PointWallet = () => {
    const { data: datas, error, loading } = useListApi("points")
    console.log(datas)
    /*
    category: "donation"
    generation: 1
    pointDate: "2023-03-27T14:33:24.042474"
    points: 7000
    projectSubject: "프로젝트 전체 주제"
    ticketCnt: 12
    */
    return (
        <>
        <table>
            {datas.map((data, index) => { 
                console.log(data)
                return (
                    <tr key={index}>
                        <td>분류 : {data.category}</td>
                        <td>프로젝트 차수 : {data.generation}</td>
                        <td>포인트 적립/사용일 : {data.pointDate}</td>
                        <td>포인트 : {data.points}</td>
                        <td>주제 : {data.projectSubject}</td>
                        <td>티켓 카운트 : {data.ticketCnt}</td>
                    </tr>
                )
            })}
        </table>
        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
            
        </>
    )
}

export default PointWallet;