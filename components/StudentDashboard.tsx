import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

// Custom hook for fetching data
const useFetch = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(url, data);
        setResponse(res.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url, data]);

  return { response, error, isLoading };
};

// Component for displaying grades as a bar chart
const GradesChart = ({ grades }) => {
  const data = {
    labels: Object.keys(grades),
    datasets: [
      {
        label: 'Grades',
        data: Object.values(grades),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

const StudentDashboard: React.FC = () => {
  // Replace this with actual data
  const grades = {
    Math: 85,
    English: 90,
    Science: 95,
    History: 88,
    Art: 92,
  };

  const { response: conversation, error, isLoading } = useFetch('/conversation', { conversation: "Tell me about the test results." });

  return (
    <div>
      <h1>Student Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <p>{conversation}</p>
        </div>
      )}
3FD2-73C9
3FD2-73C9