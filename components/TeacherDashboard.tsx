import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import ErrorComponent from './ErrorComponent';
import { useChat } from 'ai/react';
import DashboardComponents from './DashboardComponents';
import SearchBar from './SearchBar';
import _debounce from 'lodash/debounce';

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
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { response: feedback, error, isLoading } = useFetch('/feedback', {
    student_answers: ["I love this class!", "This is too difficult."],
  });
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

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
            <Component key={index} searchTerm={debouncedSearchTerm} />
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
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;