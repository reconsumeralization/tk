import React from 'react';

interface TaskProps {
  task: string;
  onComplete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onComplete }) => {
  return (
    <li className="task-item">
      <span>{task}</span>
      <button className="complete-button" onClick={onComplete}>
        Complete
      </button>
    </li>
  );
};

export default Task;
  