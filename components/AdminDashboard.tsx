import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC = () => {
  const [adminTasks, setAdminTasks] = useState<string[]>([]);

  const handleTaskAddition = (task: string) => {
    setAdminTasks((prevTasks) => [...prevTasks, task]);
  };

  const fetchData = async (): Promise<string[]> => {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const fetchAdminTasks = async (): Promise<void> => {
    try {
      const fetchedTasks = await fetchData();
      setAdminTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching admin tasks:', error);
    }
  };

  useEffect(() => {
    fetchAdminTasks();
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
