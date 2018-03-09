import {SET_SMS_SENT, SET_LOADING, SET_FORM_VALUE} from './actionTypes'

export default (state = {
  username: 'Adam',
  password: '123',
  sms_token: '',
  loading: false,
  is_sms_sent: false
}, action) => {
  switch (action.type) {
    case SET_FORM_VALUE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    }
    case SET_SMS_SENT: {
      return {
        ...state,
        is_sms_sent: action.is_sms_sent
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