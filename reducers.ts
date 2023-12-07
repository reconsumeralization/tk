import { combineReducers } from 'redux';
import { CREATE_USER, GET_USERS, CREATE_COURSE, GET_COURSES /* import other action types... */ } from './types';

// Define your individual reducers
const usersReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.payload];
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

const coursesReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_COURSE:
      return [...state, action.payload];
    case GET_COURSES:
      return action.payload;
    default:
      return state;
  }
};

// Other reducers...

// Combine reducers to create the root reducer
const rootReducer = combineReducers({
  users: usersReducer,
  courses: coursesReducer,
  // Other reducers...
});

export default rootReducer;
