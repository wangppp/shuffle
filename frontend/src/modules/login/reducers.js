import {SET_PASSWORD, SET_SMS_SENT, SET_USERNAME, SET_LOADING} from './actionTypes'

export default (state = {
  username: 'Adam',
  password: '123',
  loading: false,
  is_sms_sent: false
}, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return {
        ...state,
        username: action.username
      }
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case SET_SMS_SENT: {
      return {
        ...state,
        is_sms_sent: action.sms_state
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading
      }
    }
    default:
      return state

  }
}