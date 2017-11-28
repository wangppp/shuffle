import { SET_LOGIN, SET_PRODUCTS } from "./actionTypes";
import http from '../../utils/http'

export const setLogin = isLogin => ({
  type: SET_LOGIN,
  isLogin
});

export const loginAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setLogin(true));
    }, 1000);
  };
};

export const getProducts = () => {
  return (dispatch) => {
    http.get('/products').then(response => {
      dispatch({
        type: SET_PRODUCTS,
        products: response.data.data
      });
    });
  }
};
