import { SET_USERNAME, SET_PASSWORD } from './actionTypes';

export const setUserName = (uname) => ({
  type: SET_USERNAME,
  username: uname
});

export const setPassword = (passwd) => ({
  type: SET_PASSWORD,
  password: passwd
});
