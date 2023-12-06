import axios from 'axios';
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

export const createUser = (userData) => dispatch => {
  axios.post('/users', userData)
    .then(res =>
      dispatch({
        type: CREATE_USER,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const getUsers = () => dispatch => {
  axios.get('/users')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const createCourse = (courseData) => dispatch => {
  axios.post('/courses', courseData)
    .then(res =>
      dispatch({
        type: CREATE_COURSE,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const getCourses = () => dispatch => {
  axios.get('/courses')
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const createAssignment = (assignmentData) => dispatch => {
  axios.post('/assignments', assignmentData)
    .then(res =>
      dispatch({
        type: CREATE_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const getAssignments = () => dispatch => {
  axios.get('/assignments')
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const createTest = (testData) => dispatch => {
  axios.post('/tests', testData)
    .then(res =>
      dispatch({
        type: CREATE_TEST,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const getTests = () => dispatch => {
  axios.get('/tests')
    .then(res =>
      dispatch({
        type: GET_TESTS,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const createChat = (chatData) => dispatch => {
  axios.post('/chats', chatData)
    .then(res =>
      dispatch({
        type: CREATE_CHAT,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};

export const getChats = () => dispatch => {
  axios.get('/chats')
    .then(res =>
      dispatch({
        type: GET_CHATS,
        payload: res.data
      })
    )
    .catch(err =>
      console.log(err)
    );
};
