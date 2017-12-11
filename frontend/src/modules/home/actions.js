import { SET_LOGIN } from "./actionTypes"

export const setLogin = isLogin => ({
  type: SET_LOGIN,
  isLogin
});
