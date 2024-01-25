import React, { useState, useEffect } from 'react';
import ErrorComponent from './ErrorComponent';
import { FaBookmark, FaChalkboardTeacher, FaThumbsUp } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { Chat as ChatUI } from 'your-chat-library'; // Replace with your actual chat library
import aiConfig from '../config/aiConfig.json';

const ResourceLibrary = () => {
  const { userRole } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatApi, setChatApi] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (chatApi) {
      chatApi.updateMessages(chatMessages);
    }
  }, [chatMessages, chatApi]);

  const fetchResources = async () => {
    const endpoint = getRoleSpecificEndpoint();

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch resources. Please try again later.');
      }

      const result = await response.json();
      setResources(result);
      setLoading(false);
    } catch (error) {
      handleFetchError(error);
    }
  };

  const handleFetchError = (error) => {
    setError(error.toString());
    setLoading(false);
  };

  const getRoleSpecificEndpoint = () => {
    const roleEndpoints = {
      student: 'https://api.example.com/StudentLibrary',
      teacher: 'https://api.example.com/TeacherLibrary',
      parent: 'https://api.example.com/ParentLibrary',
    };

    return roleEndpoints[userRole] || 'https://api.example.com/ResourceLibrary';
  };

  const renderResourceTypes = () => {
    const uniqueTypes = [...new Set(resources.map(item => item.type))];

    return uniqueTypes.map(type => (
      <div key={type} className="resource-type">
        <h3>{capitalize(type)} Resources</h3>
        {filterAndRenderResources(type)}
      </div>
    ));
  };

  const filterAndRenderResources = (type) => (
    resources
      .filter(item => item.type === type)
      .map(renderResourceItem)
  );

  const renderResourceItem = (item) => (
    <div key={item.id} className="resource-item">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      {renderAdditionalInfo(item)}
    </div>
  );

  const renderAdditionalInfo = (item) => (
    <div>
      <p>Author: {item.author}</p>
      <p>Published: {item.publishedDate}</p>
      <button onClick={() => openChatWithAI(item)}>Learn More</button>
    </div>
  );

  const openChatWithAI = (item) => {
    console.log(`Launching into the details of ${item.title}.`);
    setChatOpen(true);
  };

  const capitalize = (str) => (
    str.charAt(0).toUpperCase() + str.slice(1)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent errorMessage={error} />;

  return (
    <div>
      <h1 className="header">Resource Library</h1>
      {renderResourceTypes()}
      {isChatOpen && (
        <ChatComponent
          onChatApiInitialized={(api) => setChatApi(api)}
        />
      )}
    </div>
  );
};

const ChatComponent = ({ onChatApiInitialized }) => {
  const { userRole } = useAuth();
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    addMessage("AI", `Hello ${userRole}! How can I assist you today?`);
  }, [userRole]);

  const addMessage = (sender, text) => {
    setChatMessages([...chatMessages, { sender, text }]);
  };

  const handleUserMessage = async (userMessage) => {
    const aiResponse = await fetchAiResponse(userMessage);
    addMessage("AI", aiResponse);
  };

  const fetchAiResponse = async (userMessage) => {
    const endpoint = aiConfig.api_endpoint || 'your-default-ai-api-endpoint';
    const headers = aiConfig.api_type === 'google' ? {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aiConfig.api_key}`
    } : {
      'Content-Type': 'application/json'
    };
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: headers,
    });
    const data = await response.json();
    return data.aiResponse;
  };

  return (
    <div className="chat">
      <h2>AI Chat</h2>
      <ChatUI
        messages={chatMessages}
        onUserMessage={handleUserMessage}
        onChatApiInitialized={onChatApiInitialized}
        showEmoji
      />
    </div>
  );
};

export default ResourceLibrary;

