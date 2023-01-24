import User from "../../../types/user.types";
import UserActionTypes from "./user.action-types";

interface LoginUserAction {
  type: typeof UserActionTypes.LOGIN;
  payload: User;
}

export const loginUser = (payload: User): LoginUserAction => ({
  type: UserActionTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT,
});
