import axios from 'axios'
import { getToken, isLogOut } from '../auth'

const token = getToken()
const url_prefix = process.env.NODE_ENV !== 'production' ? '//localhost:5000/api/v1' : '/api/v1'

axios.interceptors.request.use(
    config => {
        config.url = url_prefix + config.url;
        config.headers['Authorization'] = `bearer ${token}`
        return config
    }
)


export default axios
