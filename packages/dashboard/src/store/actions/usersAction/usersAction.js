import { setUsers, usersLoading } from "../../reducers/usersReducer";
import UserAxios from "../axios/UserAxios";

export const getUsers = () => async (dispatch) => {
    let result = await UserAxios.get("/user/allUser");
    dispatch(setUsers(result.data.user));
    dispatch(usersLoading(false));
  };