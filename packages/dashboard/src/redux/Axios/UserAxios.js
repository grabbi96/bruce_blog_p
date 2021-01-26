import axios from 'axios';
import store from '../store';
// Set config defaults when creating the instance
const UserAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { Authorization: localStorage.getItem('token') },
});

export default UserAxios;
