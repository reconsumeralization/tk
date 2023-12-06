import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
});

export const createUser = async (userData) => {
  try {
    const response = await API.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await API.post('/courses', courseData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCourses = async () => {
  try {
    const response = await API.get('/courses');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAssignment = async (assignmentData) => {
  try {
    const response = await API.post('/assignments', assignmentData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAssignments = async () => {
  try {
    const response = await API.get('/assignments');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTest = async (testData) => {
  try {
    const response = await API.post('/tests', testData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTests = async () => {
  try {
    const response = await API.get('/tests');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createChat = async (chatData) => {
  try {
    const response = await API.post('/chats', chatData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getChats = async () => {
  try {
    const response = await API.get('/chats');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
