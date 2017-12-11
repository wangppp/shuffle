import { SET_LOGIN } from './actionTypes';
import { isLogin } from '../../utils/auth';


// 初始化state， 在各自的 reducers 里
export default (state = { 
  isLogin: isLogin(),
}, action) => {
  switch(action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.isLogin
      };
    }
    default:
      return state;
  }
}
