
import React, { useState, useEffect } from 'react';
import ErrorComponent from './ErrorComponent';
import { fetchData } from './DataFetchUtility';

const AssignmentManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData('https://api.example.com/AssignmentManagement').then(fetchedData => {
      if (!fetchedData.error) {
        setData(fetchedData);
        setLoading(false);
      } else {
        setError(fetchedData.error);
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent />;

  return (
    <div>
      <h1>AssignmentManagement</h1>
      {data.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default AssignmentManagement;
