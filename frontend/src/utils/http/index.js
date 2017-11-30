import axios from 'axios'
import {
  getToken,
  removeToken
} from '../auth'


const url_prefix = process.env.NODE_ENV !== 'production' ? '//localhost:5000/api/v1' : '/api/v1'

axios.interceptors.request.use(
  config => {
    const token = getToken()
    config.url = url_prefix + config.url
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  }
)

axios.interceptors.response.use(
  response => {

    return response;
  },
  error => {
    try {
      const status = error.response.status;
      if (status === 401) {
        // 强制跳转了，以后修改
        removeToken()
        window.location.reload()
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
)


export default axios