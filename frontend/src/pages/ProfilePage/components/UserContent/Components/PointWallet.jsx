import useListApi from "./api"

const PointWallet = () => {
    const { data, error, loading } = useListApi("points")

    return (
        <ul>
            {data?.length > 0 ? data.forEach((e) => <li>e</li>):<li>포인트 내역이 없습니다</li> }
        </ul>
    )
}

export default PointWallet;