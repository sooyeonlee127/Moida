import useListApi from "./api"

const DonationList = () => {
    const { data, error, loading } = useListApi("donation")

    return (
        <ul>
            {data?.length > 0 ? data.forEach((e) => <li>e</li>):<li>봉사 내역이 없습니다</li> }
        </ul>
    )
}

export default DonationList;