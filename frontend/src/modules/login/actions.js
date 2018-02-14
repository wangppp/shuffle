import { SET_USERNAME, SET_PASSWORD, SET_SMS_SENT, SET_LOADING } from './actionTypes';
import http from "../../utils/http";
import {actions as loginActions} from "./index";
import {getLoginFormData} from './view';

export const setUserName = (uname) => ({
  type: SET_USERNAME,
  username: uname
});

export const setPassword = (passwd) => ({
  type: SET_PASSWORD,
  password: passwd
});

export const setSmsSentState = (state) => ({
  type: SET_SMS_SENT,
  is_sms_sent: state
});

export const requestSmsToken = ({username, password}) => {
  return async (dispatch) => {
    dispatch({type: SET_LOADING, loading: true});
    const form = getLoginFormData({username, password});
    try {
      const { data } = await http.post('/public/login_sms_token', form);
      if (data.status === true) {
        dispatch(loginActions.setSmsSentState(true));
        dispatch({type: SET_LOADING, loading: false});
      }
    } catch(error) {
      dispatch({type: SET_LOADING, loading: false});
    }
  }
};
