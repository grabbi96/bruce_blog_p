import axios from "axios";
import { store } from "../../store";
// Set config defaults when creating the instance
const CubeAxios = axios.create({
  baseURL: store.getState().info.cubeUser,
});

export default CubeAxios;
