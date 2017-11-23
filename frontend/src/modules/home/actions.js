import { SET_LOGIN } from "./actionTypes";

export const setLogin = isLogin => ({
  type: SET_LOGIN,
  isLogin
})

export const loginAsync = () =>{
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setLogin(true));
    }, 1000);
  };
}
