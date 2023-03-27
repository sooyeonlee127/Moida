import useListApi from "./api"

const VolunteerList = () => {
    const { data:datas, error, loading } = useListApi("volunteer")

    return (
        <>
        <table>
            {datas.map((data, index) => { 
                console.log(data)
                return (
                    <tr key={index}>
                        <td>프로젝트 차수 : {data.generation}</td>
                        <td>프로젝트 id : {data.projectId}</td>
                        <td>프로젝트 제목 : {data.projectSubject}</td>
                        <td>봉사 날짜 : {data.regDate}</td>
                        <td>상태 : {data.status}</td>
                        <td>봉사 id : {data.volunteerId}</td>
                    </tr>
                )
            })}
        </table>
        <p> {datas.length === 0 && !loading? "빈 값":""}{loading? "로딩 중":""}</p>
            
        </>
    )
}

export default VolunteerList;