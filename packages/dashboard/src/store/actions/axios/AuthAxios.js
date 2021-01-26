import axios from "axios";
import { store } from "../../store";
// Set config defaults when creating the instance
const AuthAxios = axios.create({
  baseURL: store.getState().info.baseUrl,
});

export default AuthAxios;
