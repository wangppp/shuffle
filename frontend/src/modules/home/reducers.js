import { SET_LOGIN } from './actionTypes';

export default (state = { isLogin: false}, action) => {
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
