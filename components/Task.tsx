// Task.ts
import React, { useCallback } from 'react';
import moment from 'moment';
import axios from 'axios';
import classnames from 'classnames';
import { FaBeer, FaCoffee, FaBomb, FaCat, FaFire } from 'react-icons/fa';

interface TaskProps {
  task: string;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  priority: string;
  isCompleted: boolean;
}

const Task: React.FC<TaskProps> = ({ task, onComplete, onEdit, onDelete, priority, isCompleted }) => {
  const renderPriorityLabel = () => (
    <span style={{ color: getPriorityColor() }}>{priority}</span>
  );

  const getPriorityColor = useCallback(() => {
    const priorityColors = {
      high: 'red',
      medium: 'orange',
      low: 'green',
    };
    return priorityColors[priority] || 'black';
  }, [priority]);

  const handleNetworkRequest = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCreationDate = () => {
    const creationDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(`Task created on: ${creationDate}`);
  };

  const debounceEdit = useCallback(_.debounce(onEdit, 300), [onEdit]);

  return (
    <li className={classnames('taskItem', { completed: isCompleted })}>
      <div>
        <span>{task}</span>
        <button className="complete-button" onClick={onComplete}>
          {isCompleted ? 'Undo' : 'Complete'} <FaFire />
        </button>
      </div>
      <div>
        {renderPriorityLabel()}
        <button className="edit-button" onClick={debounceEdit}>
          Edit <FaCoffee />
        </button>
        <button className="delete-button" onClick={onDelete}>
          Delete <FaBomb />
        </button>
      </div>
      <div>
        <button onClick={formatCreationDate}>
          Show Creation Date <FaCat />
        </button>
        <button onClick={handleNetworkRequest}>
          Network Request <FaBeer />
        </button>
      </div>
    </li>
  );
};

export default Task;
