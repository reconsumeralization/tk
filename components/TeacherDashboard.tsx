import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

const TeacherDashboard: React.FC = () => {
  const { response: feedback, error, isLoading } = useFetch('/feedback', { student_answers: ["I love this class!", "This is too difficult."] });
  const { messages, input, handleInputChange, handleSubmit } = useChat(); // from Vercel AI SDK

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <Notifications /> {/* for notifications */}
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <ErrorComponent error={error} />
      ) : (
        <div>
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
            <div key={m.id}>
              {m.role}: {m.content}
            </div>
          ))}
          <form onSubmit={handleSubmit}> {/* from Vercel AI SDK */}
            <input value={input} placeholder="Say something..." onChange={handleInputChange} /> {/* from Vercel AI SDK */}
          </form>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
