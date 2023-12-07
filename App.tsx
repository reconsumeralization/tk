import React from 'react';
import { useNavigate, useLocation, useRoutes } from 'react-router-dom';

import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentsDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import NotFound from './components/NotFound';

// Define the prop types for the App component
type AppProps = {
  // Add any props you need here
};

// Define the App component as a functional component
const App: React.FC<AppProps> = (props) => {
  // Use the useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Use the useRoutes hook to define the routes
  const routes = useRoutes([
    { path: '/', element: <Login /> },
    { path: '/teacher', element: <TeacherDashboard /> },
    { path: '/student', element: <StudentDashboard /> },
    { path: '/parent', element: <ParentDashboard /> },
    { path: '/admin', element: <AdminDashboard /> },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
