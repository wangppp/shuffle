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
  // async 返回promise函数
  return async (dispatch) => {
    const res = await http.get('/products');
    dispatch({
      type: SET_PRODUCTS,
      products: res.data.data
    });
  }
};
