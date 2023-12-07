import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
<<<<<<< HEAD
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
=======
import { Spinner } from 'react-bootstrap'; // for loading spinner
import ErrorComponent from './ErrorComponent'; // for better error display
import { useChat } from 'ai/react'; // from Vercel AI SDK
import StudentManagement from './StudentManagement'; // for managing students
import CourseManagement from './CourseManagement'; // for managing courses
import AssignmentManagement from './AssignmentManagement'; // for managing assignments
import AttendanceTracking from './AttendanceTracking'; // for tracking attendance
import PerformanceTracking from './PerformanceTracking'; // for tracking performance
import CommunicationTools from './CommunicationTools'; // for communication
import ResourceLibrary from './ResourceLibrary'; // for resources
import Calendar from './Calendar'; // for calendar and scheduling
import Notifications from './Notifications'; // for notifications

// Custom hook for fetching data
const useFetch = <T, U>(url: T, data: U) => {
  const [response, setResponse] = useState<U | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback<() => Promise<void>>(async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(url, data);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
>>>>>>> 8478cd0c6baded29a057b2e5cabb6540d1cb0952
  }, [url, data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, isLoading };
};

const TeacherDashboard: React.FC = () => {
<<<<<<< HEAD
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { response: feedback, error, isLoading } = useFetch('/feedback', {
    student_answers: ["I love this class!", "This is too difficult."],
  });
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);
=======
const TeacherDashboard: React.FC<Props> = () => {
  const { response: feedback, error, isLoading } = useFetch('/feedback', { student_answers: ["I love this class!", "This is too difficult."] });
  const { messages, input, handleInputChange, handleSubmit } = useChat(); // from Vercel AI SDK
>>>>>>> 8478cd0c6baded29a057b2e5cabb6540d1cb0952

  return (
    <div>
      <h1>Teacher Dashboard</h1>
<<<<<<< HEAD
      <DashboardComponents.Notifications />
      <SearchBar handleSearchChange={handleSearchChange} />
=======
      <Notifications /> {/* for notifications */}
>>>>>>> 8478cd0c6baded29a057b2e5cabb6540d1cb0952
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <div>
<<<<<<< HEAD
          {DashboardComponents.components.map((Component, index) => (
            <Component key={index} searchTerm={debouncedSearchTerm} />
          ))}
          {feedback.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {messages.map((m) => (
=======
          <StudentManagement /> {/* for managing students */}
          <CourseManagement /> {/* for managing courses */}
          <AssignmentManagement /> {/* for managing assignments */}
          <AttendanceTracking /> {/* for tracking attendance */}
          <PerformanceTracking /> {/* for tracking performance */}
          <CommunicationTools /> {/* for communication */}
          <ResourceLibrary /> {/* for resources */}
          <Calendar /> {/* for calendar and scheduling */}
          {feedback.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {messages.map(m => ( // from Vercel AI SDK
>>>>>>> 8478cd0c6baded29a057b2e5cabb6540d1cb0952
            <div key={m.id}>
              {m.role}: {m.content}
            </div>
          ))}
<<<<<<< HEAD
          <DashboardComponents.Form
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
=======
          <form onSubmit={handleSubmit}> {/* from Vercel AI SDK */}
            <input value={input} placeholder="Say something..." onChange={handleInputChange} /> {/* from Vercel AI SDK */}
          </form>
>>>>>>> 8478cd0c6baded29a057b2e5cabb6540d1cb0952
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;