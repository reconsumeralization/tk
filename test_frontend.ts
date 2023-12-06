import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './store';
import * as actions from './actions';

// Mock the axios module
jest.mock('axios');

describe('Frontend Integration Tests', () => {
  test('renders login page', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('navigates to teacher dashboard', async () => {
    actions.createUser = jest.fn().mockResolvedValueOnce({
      data: {
        username: 'teacher1',
        password: 'password',
        role: 'teacher'
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'teacher1' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => screen.getByText(/teacher dashboard/i));

    expect(screen.getByText(/teacher dashboard/i)).toBeInTheDocument();
  });

  // Add more tests for other user roles and functionalities
});
