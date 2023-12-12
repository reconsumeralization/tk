import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from './ErrorComponent';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import 'react-toastify/dist/ReactToastify.css';

const Notifications = ({ someProp, anotherProp, pageLimit = 10 }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.example.com/Notifications');

      if (response.status !== 200) {
        throw new Error(`Failed to fetch notifications. Error: ${response.status}`);
      }

      const data = _.orderBy(response.data, ['date'], ['desc']);
      setNotifications(data);
      toast.success('Notifications loaded successfully!', { autoClose: 3000 });
    } catch (error) {
      setError(error.toString());
      toast.error(`Oops! ${error.message}`, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentNotifications = _.slice(notifications, currentPage * pageLimit, (currentPage + 1) * pageLimit);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorComponent errorMessage={error} />;

  return (
    <div>
      <h1 className="header">Notifications</h1>
      {currentNotifications.length > 0 ? (
        currentNotifications.map(renderNotificationItem)
      ) : (
        <p>No notifications available. Stay tuned for updates!</p>
      )}
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(notifications.length / pageLimit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

const renderNotificationItem = (item) => (
  <div key={item.id} className="notification-item">
    <h2>{item.title}</h2>
    <p>{item.description}</p>
    {renderAdditionalInfo(item)}
  </div>
);

const renderAdditionalInfo = (item) => (
  <div>
    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
    {item.link && renderLearnMoreLink(item.link)}
  </div>
);

const renderLearnMoreLink = (link) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    Learn More <span role="img" aria-label="right arrow">➡️</span>
  </a>
);

Notifications.propTypes = {
  someProp: PropTypes.string,
  anotherProp: PropTypes.number,
  pageLimit: PropTypes.number,
};

export default Notifications;
