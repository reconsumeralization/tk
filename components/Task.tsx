import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import classnames from 'classnames';
import { FaBeer, FaCoffee, FaBomb, FaCat, FaFire, FaMicrophone, FaVolumeUp } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import natural from 'natural';
import _ from 'lodash';

interface TaskProps {
  task: string;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  priority: string;
  isCompleted: boolean;
}

const Task: React.FC<TaskProps> = ({ task, onComplete, onEdit, onDelete, priority, isCompleted }) => {
  const [sentiment, setSentiment] = useState<string>('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    analyzeSentiment();
  }, [task]);

  const analyzeSentiment = () => {
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    const sentimentScore = analyzer.getSentiment(task.split(' '));
    setSentiment(sentimentScore > 0 ? 'Positive' : sentimentScore < 0 ? 'Negative' : 'Neutral');
  };

  const handleNetworkRequest = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      console.log(response.data);
    } catch (error) {
      handleNetworkError();
    }
  };

  const handleNetworkError = () => {
    console.error('Network request failed.');
    alert('Network request failed. Please try again later.');
  };

  const handleVoiceCommand = () => {
    if (transcript.includes('complete')) {
      onComplete();
      resetTranscript();
    }
    // Handle other voice commands here...
  };

  const handleTextToSpeech = () => {
    speak({ text: task });
  };

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

  const formatCreationDate = () => {
    const creationDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(`Task created on: ${creationDate}`);
  };

  const debounceEdit = useCallback(_.debounce(onEdit, 300), [onEdit]);

  return (
    <li className={classnames('taskItem', { completed: isCompleted })} role="listitem" aria-label={task}>
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
        <span>Sentiment: {sentiment}</span>
        <button onClick={handleVoiceCommand}>
          Voice Command <FaMicrophone />
        </button>
        <button onClick={handleTextToSpeech}>
          Read Aloud <FaVolumeUp />
        </button>
      </div>
    </li>
  );
};

export default Task;
