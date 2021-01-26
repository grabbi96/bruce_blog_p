import axios from "axios";
import { store } from "../../store";
// Set config defaults when creating the instance
const UserAxios = axios.create({
  baseURL: store.getState().info.baseUrl,
  headers: { Authorization: localStorage.getItem("token") },
});

export default UserAxios;
