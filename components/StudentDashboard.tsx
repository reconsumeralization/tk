import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

// Custom hook for fetching data
const useFetch = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(url, data);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [url, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading };
};
