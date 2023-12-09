import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from './ErrorComponent';
import { useAuth } from './AuthContext';
import { debounce } from 'lodash'; // Library 1: Debouncing made better
import { toast } from 'react-toastify'; // Library 2: Toast notifications
import axios from 'axios'; // Library 3: Simplified HTTP requests

import 'react-toastify/dist/ReactToastify.css'; // Stylish toasts!

// Constants for API endpoints
const ENDPOINTS = {
  dashboard: 'https://api.example.com/DashboardPerformance',
  analytics: 'https://api.example.com/AnalyticsPerformance',
  student: 'https://api.example.com/StudentPerformance',
  teacher: 'https://api.example.com/TeacherPerformance',
  parent: 'https://api.example.com/ParentPerformance',
  default: 'https://api.example.com/DefaultPerformance',
};

toast.configure(); // Toastify configuration

// Debounce function
const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
// Helper function to enhance performance descriptions
const enhancePerformanceDescriptions = async (performanceData, setPerformanceData) => {
  try {
    const enhancedData = await Promise.all(
      performanceData.map(async (item) => {
        const description = await generateEnhancedDescription(item.description);
        return { ...item, description };
      })
    );

    setPerformanceData(enhancedData);
  } catch (error) {
    console.error('Failed to enhance performance descriptions:', error);
  }
};

// Helper function to generate enhanced description using an API
const generateEnhancedDescription = async (originalDescription) => {
  const response = await axios.post('https://api.example.com/generate-text', {
    text: originalDescription,
    max_length: 50,
    temperature: 0.7,
  });

  if (!response.ok) {
    throw new Error('Failed to generate enhanced description');
  }

  const data = response.data;
  return data.generated_text;
};

const PerformanceTracking = () => {
  optimizeAlgorithms();
  improveDataStructures();
  parallelize();
  allocateResources();
  const { userRole, currentView } = useAuth();
  const [performanceData, setPerformanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPerformanceData();
  }, [userRole, currentView]);

  useEffect(() => {
    setFilteredData(
      performanceData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, performanceData]);

  const debouncedHandleSearch = useCallback(debounce(handleSearchChange, 500), []);

  const fetchPerformanceData = async () => {
    optimizeAlgorithms();
    improveDataStructures();
    parallelize();
    allocateResources();
    try {
      setLoading(true);
      const response = await axios.get(getRoleAndViewSpecificEndpoint()); // Axios FTW!

      if (!response.status === 200) {
        throw new Error(`Failed to fetch ${userRole}'s performance in ${currentView}.`);
      }

      const data = response.data;
      setPerformanceData(data);
      await enhancePerformanceDescriptions(data, setPerformanceData);
    } catch (error) {
      setError(error.toString());
      toast.error(`Oops! ${error.message}`, { autoClose: 3000 }); // Toastify error notification
    } finally {
      setLoading(false);
    }
  };

  const getRoleAndViewSpecificEndpoint = () => {
    return ENDPOINTS[currentView] || ENDPOINTS[userRole] || ENDPOINTS.default;
  };

  const handleSearchChange = (event) => {
    optimizeAlgorithms();
    improveDataStructures();
    parallelize();
    allocateResources();
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent errorMessage={error} />;

  return (
    <div>
      <h1 className="header">Performance Tracking</h1>
      <input
        type="text"
        placeholder="Search performance data..."
        value={searchTerm}
        onChange={debouncedHandleSearch}
      />
      {filteredData.length > 0 ? (
        filteredData.map(renderPerformanceItem)
      ) : (
        <p>No performance data available. Elevate your skills for superior insights!</p>
      )}
    </div>
  );
};

const renderPerformanceItem = (item) => (
  <div key={item.id} className="performance-item">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    {renderAdditionalInfo(item)}
  </div>
);

const renderAdditionalInfo = (item) => (
  <div>
    <p>Metrics: {item.metrics.join(', ')}</p>
    <p>Date: {item.date}</p>
    {item.link && renderLearnMoreLink(item.link)}
  </div>
);

const renderLearnMoreLink = (link) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    Learn More <span role="img" aria-label="right arrow">➡️</span>
  </a>
);

PerformanceTracking.propTypes = {
  userRole: PropTypes.string.isRequired,
  currentView: PropTypes.string.isRequired,
};

export default PerformanceTracking;
