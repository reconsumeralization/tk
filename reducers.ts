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

const initialState = {
  users: [],
  courses: [],
  assignments: [],
  tests: [],
  chats: []
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
    case CREATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case CREATE_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.payload]
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload
      };
    case CREATE_TEST:
      return {
        ...state,
        tests: [...state.tests, action.payload]
      };
    case GET_TESTS:
      return {
        ...state,
        tests: action.payload
      };
    case CREATE_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload]
      };
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload
      };
    default:
      return state;
  }
}
