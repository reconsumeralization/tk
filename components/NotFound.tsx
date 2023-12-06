import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import your CSS file for styling

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2 className="not-found-title">404 - Not Found</h2>
        <p className="not-found-message">
          Oops! It seems like the page you are looking for does not exist.
        </p>
        <p className="not-found-suggestion">
          You can go back to the{' '}
          <Link to="/" className="not-found-link">
            home page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default NotFound;
