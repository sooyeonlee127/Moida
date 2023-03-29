import { useState, useEffect } from "react";
import api from "../../../../../api/auth";

const useListApi = (type) => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/users/me/${type}`, {
          headers: {
            accept: "*/*",
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        console.log(response.data)
        setData(response.data.donationList);
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