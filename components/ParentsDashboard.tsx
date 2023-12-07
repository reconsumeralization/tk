import React, { useState, useEffect } from 'react';
import './ParentDashboard.css'; // Import your CSS file for styling
import TaskForm from './TaskForm'; // Assume you have a component for adding tasks
import Task from './Task'; // Assume you have a component for displaying tasks

const ParentDashboard: React.FC = () => {
  const [childTasks, setChildTasks] = useState<string[]>([]);

  const handleTaskCompletion = (taskIndex: number) => {
    const updatedTasks = [...childTasks];
    updatedTasks.splice(taskIndex, 1);
    setChildTasks(updatedTasks);
  };

  const handleTaskAddition = (newTask: string) => {
    setChildTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const fetchData = async (): Promise<string[]> => {
    // Simulate fetching data from an API
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['Homework', 'Chores', 'Read a book']);
      }, 1000);
    });
  };

  const fetchChildTasks = async (): Promise<string[]> => {
    const fetchedData = await fetchData();
    return fetchedData as string[];
  };

  useEffect(() => {
    const fetchAndSetChildTasks = async () => {
      const fetchedTasks = await fetchChildTasks();
      setChildTasks(fetchedTasks);
    };
    fetchAndSetChildTasks();
  }, []);

  return (
    <div className="parent-dashboard-container">
      <h1 className="parent-dashboard-title">Parent Dashboard</h1>
      <p className="parent-dashboard-message">
        Welcome! Manage tasks for your child with ease.
      </p>

      {/* TaskForm component for adding new tasks */}
      <TaskForm onTaskAddition={handleTaskAddition} />

      {/* Animated list of tasks */}
      <ul className="child-tasks-list">
        {childTasks.map((task, index) => (
          <Task key={index} task={task} onComplete={() => handleTaskCompletion(index)} />
        ))}
      </ul>
    </div>
  );
};

export default ParentDashboard;
