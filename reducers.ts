import {
    CREATE_USER,
    GET_USERS,
    CREATE_COURSE,
    GET_COURSES,
    CREATE_ASSIGNMENT,
    GET_ASSIGNMENTS,
    CREATE_TEST,
    GET_TESTS,
    CREATE_CHAT,
    GET_CHATS
  } from './types';
  
  import { UserType, CourseType /* import other types... */ } from './types';
  
  export interface RootState {
    users: UserType[];
    courses: CourseType[];
    // Similarly define state for Assignment, Test, and Chat
  }
  
  const initialState: RootState = {
    users: [],
    courses: [],
    // Initialize other state properties...
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case CREATE_USER:
        return {
          ...state,
          users: [...state.users, action.payload]
        };
      case GET_USERS:
        return {
          ...state,
          users: action.payload
        };
      // Handle other actions...
      default:
        return state;
    }
  }
  