import React, { useState } from 'react';

interface TaskFormProps {
  onTaskAddition: (newTask: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAddition }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      onTaskAddition(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
