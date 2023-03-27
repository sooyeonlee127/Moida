import { useState, useEffect } from "react";
import axios from "axios";

const useListApi = (type) => {
  const [data, setData] = useState([]);
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
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return { data, error, loading };
};

export default useListApi;