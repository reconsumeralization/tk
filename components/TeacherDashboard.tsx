import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import ErrorComponent from './ErrorComponent';
import { useChat } from 'ai/react';
import DashboardComponents from './DashboardComponents';
import SearchBar from './SearchBar';
import _debounce from 'lodash/debounce';
import ReactGA from 'react-ga'; // For Analytics Integration
import { useAuth } from './auth'; // For User Authentication (Assuming you have an auth hook)

/**
 * Custom hook for fetching data.
 *
 * @param {string} url - The API endpoint URL.
 * @param {object} data - The data to be sent with the request.
 * @returns {object} - The response, error, and loading status.
 */
const useFetch = (url, data) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    try {
      const res = await axios.post(url, data, { cancelToken: source.token });
      setResponse(res.data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
    return () => source.cancel();
  }, [url, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading };
};

const TeacherDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('timestamp');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  // Debounce search term to avoid excessive API calls.
  const debouncedTerm = useDebounce(searchTerm, 500);

  // Handle search term change.
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Handle sort option change.
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle page change in pagination.
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle dark mode and persist in local storage.
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Handle file selection change.
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload.
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('/upload', formData);
      console.log(`Uploaded file ${response.data.file}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch feedback data using the custom hook.
  const { response: feedback, error, isLoading } = useFetch('/feedback', {
    student_answers: ["I love this class!", "This is too difficult."],
  });

  // Handle chat messages using the useChat hook.
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // Update feedback history when new feedback is received.
  useEffect(() => {
    if (feedback && feedback.length > 0) {
      setFeedbackHistory((prevHistory) => [...prevHistory, ...feedback]);
    }
  }, [feedback]);

  // Initialize Google Analytics on component mount.
  useEffect(() => {
    ReactGA.initialize('Your Google Analytics Tracking ID');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // Handle user authentication using the auth hook.
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <DashboardComponents.Notifications />
      <SearchBar handleSearchChange={handleSearchChange} />
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <div>
          {DashboardComponents.components.map((Component, index) => (
            <Component key={index} searchTerm={debouncedTerm} />
          ))}
          {feedback.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {messages.map((m) => (
            <div key={m.id}>
              {m.role}: {m.content}
            </div>
          ))}
          <DashboardComponents.Form
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
          {!user ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
