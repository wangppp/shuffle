import { SET_LOGIN, SET_PRODUCTS } from './actionTypes';
import { isLogin } from '../../utils/auth';


// 初始化state， 在各自的 reducers 里
export default (state = { 
  isLogin: isLogin(),
  products: []
}, action) => {
  switch(action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.isLogin
      };
    }
    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.products
      };
    }
    default:
      return state;
  }
}
