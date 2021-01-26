import axios from 'axios';
import store from '../store';
// Set config defaults when creating the instance
const AuthAxios = axios.create({
  baseURL: 'http://localhost:4000',
});

export default AuthAxios;
