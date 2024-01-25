import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC = () => {
  const [adminTasks, setAdminTasks] = useState<string[]>([]);

  const handleTaskAddition = (task: string) => {
    setAdminTasks((prevTasks) => [...prevTasks, task]);
  };

  import { fetchData } from './DataFetchUtility';

  import { fetchData } from './DataFetchUtility';

  useEffect(() => {
    fetchData('https://api.example.com/data').then(fetchedData => {
      if (!fetchedData.error) {
        setAdminTasks(fetchedData);
      }
      // Errors are now handled by the fetchData function itself
    });
  }, []);

  return (
    <div>
      <h1>Welcome to the Enhanced Admin Dashboard</h1>
      <p>This is where the admin can manage the system more efficiently.</p>
      <button onClick={() => handleTaskAddition('New Task')}>Add Task</button>
      <ul>
        {adminTasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
