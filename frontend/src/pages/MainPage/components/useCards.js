import { useEffect, useState } from "react";
import axios from "axios";

const card = {
    "id": null,
    "projectReqDto": {
        "category": null,
        "subject": null,
        "description": null,
        "pointPerMoi": null
    },
    "donationResDto": {
        "startDate": null,
        "endDate": null,
        "targetAmount": null,
        "subject": null,
        "description": null,
        "id": null,
        "amount": null,
    },
}
const useCards = () => { // -- 이은혁
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setIsLoading(true)
        try {
            axios({
                url: "/api/project",
                method: "GET",
            })
            .then((res) => {
                const tmp = res.data
                const tmpLen = 3-tmp.length>0 ? 3-tmp.length : 0;   // 3개까지만 등록 - 이은혁
                for (let i=0; i<tmpLen; i++) {  //  axios로 받은 데이터의 길이가 3개 미만인 경우, 나머지는 빈 오브젝트 추가
                    tmp.push(card) 
                }
                setCards(tmp)
            })
        } catch(err) {
            setError(err)
        }
    }, [])

    
    
    return {cards, isLoading, error}
}


export default useCards;