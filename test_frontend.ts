import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import * as actions from './actions';
import NewComponent from './NewComponent'; // Import the new component

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

test('renders the new component', () => {
  render(
    <Provider store={mockStore({})}>
      <Router>
        <NewComponent />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/new component/i)).toBeInTheDocument();
});

test('navigates to the admin dashboard', async () => {
  actions.createUser = jest.fn().mockResolvedValueOnce({
    data: {
      username: 'admin1',
      password: 'password',
      role: 'admin',
    },
  });

  await setup({ username: 'admin1', password: 'password', role: 'admin' });

  expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  // Add more assertions here
});

test('displays an error message for unsuccessful registration', async () => {
test('navigates to the new component', async () => {
  actions.createResource = jest.fn().mockResolvedValueOnce({
    data: {
      resource: 'newresource',
    },
  });

  await setup({ resource: 'newresource' });

  expect(screen.getByText(/new component/i)).toBeInTheDocument();
  // Add more assertions here
});
  actions.createUser = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Username already exists',
      },
    },
  });

  await setup({ username: 'existinguser', password: 'password' });

  expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
});

test('navigates to the parent dashboard', async () => {
  actions.createUser = jest.fn().mockResolvedValueOnce({
    data: {
      username: 'parent1',
      password: 'password',
      role: 'parent',
    },
  });

  await setup({ username: 'parent1', password: 'password', role: 'parent' });

  expect(screen.getByText(/parent dashboard/i)).toBeInTheDocument();
  // Add more assertions here
});
  await setup({ username: 'student1', password: 'password', role: 'student' });

  expect(screen.getByText(/student dashboard/i)).toBeInTheDocument();
  // Add more assertions here
test('displays an error message for unsuccessful resource creation', async () => {
  actions.createResource = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Resource already exists',
      },
    },
  });

  await setup({ resource: 'existingresource' });

  expect(screen.getByText(/resource already exists/i)).toBeInTheDocument();
});
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
test('displays an error message for unsuccessful course creation', async () => {
test('displays an error message for unsuccessful resource update', async () => {
  actions.updateResource = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Resource update failed',
      },
    },
  });

  await setup({ resource: 'existingresource' });

  expect(screen.getByText(/resource update failed/i)).toBeInTheDocument();
});
  actions.createCourse = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Course already exists',
      },
    },
  });

  await setup({ username: 'teacher1', password: 'password', role: 'teacher' });

  fireEvent.change(screen.getByLabelText(/course name/i), {
    target: { value: 'existingcourse' },
  });
  fireEvent.click(screen.getByText(/create course/i));

  expect(screen.getByText(/course already exists/i)).toBeInTheDocument();
});

test('displays an error message for unsuccessful assignment creation', async () => {
  actions.createAssignment = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Assignment already exists',
      },
    },
  });

  await setup({ username: 'teacher1', password: 'password', role: 'teacher' });

  fireEvent.change(screen.getByLabelText(/assignment name/i), {
    target: { value: 'existingassignment' },
  });
  fireEvent.click(screen.getByText(/create assignment/i));

  expect(screen.getByText(/assignment already exists/i)).toBeInTheDocument();
});
test('displays an error message for unsuccessful resource deletion', async () => {
  actions.deleteResource = jest.fn().mockRejectedValueOnce({
    response: {
      data: {
        message: 'Resource deletion failed',
      },
    },
  });

  await setup({ resource: 'existingresource' });

  expect(screen.getByText(/resource deletion failed/i)).toBeInTheDocument();
});
