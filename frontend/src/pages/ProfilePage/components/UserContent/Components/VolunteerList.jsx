import useListApi from "./api"

const VolunteerList = () => {
    const { data, error, loading } = useListApi("volunteer")

    return (
        <ul>
            {data?.length > 0 ? data.forEach((e) => <li>e</li>):<li>기부 내역이 없습니다</li> }
        </ul>
    )
}

export default VolunteerList;