import { useState, useEffect } from "react";
import axios from "axios";

const useListApi = (type) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/me/${type}`, {
          headers: {
            accept: "*/*",
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        console.log(response.data)
        if(type==="donation") { // type별 데이터 저장 - 이은혁
          setData(response.data.donationList);

        } else if (type==="volunteer") {
          setData(response.data.volunteerList);

        } else if (type==="points") {
          setData(response.data.pointList);

        } else if (type==="volunteer-article") {
          setData(response.data.articleList);
        }
        setDataLength(response.data.length);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return { data, length: dataLength, error, loading };
};

export default useListApi;