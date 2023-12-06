import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import * as actions from './actions';

// Mock the axios module
jest.mock('axios');

const mockStore = configureStore([]);

const setup = async (user) => {
  const store = mockStore({
    user,
  });

  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: user.username },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: user.password },
  });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() => screen.getByText(`/${user.role} dashboard/i`));
};

test('renders the login page', () => {
  render(
    <Provider store={mockStore({})}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('navigates to the teacher dashboard', async () => {
  actions.createUser = jest.fn().mockResolvedValueOnce({
    data: {
      username: 'teacher1',
      password: 'password',
      role: 'teacher',
    },
  });

  await setup({ username: 'teacher1', password: 'password', role: 'teacher' });

  expect(screen.getByText(/teacher dashboard/i)).toBeInTheDocument();
  // Add more assertions here
});

test('navigates to the student dashboard', async () => {
  actions.createUser = jest.fn().mockResolvedValueOnce({
    data: {
      username: 'student1',
      password: 'password',
      role: 'student',
    },
  });

  await setup({ username: 'student1', password: 'password', role: 'student' });

  expect(screen.getByText(/student dashboard/i)).toBeInTheDocument();
  // Add more assertions here
});

test('displays an error message for unsuccessful login', async () => {
  actions.createUser = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Invalid username or password',
      },
    },
  });

  await setup({ username: 'wronguser', password: 'wrongpass' });

  expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
});
