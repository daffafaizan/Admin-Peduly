import axios from 'axios'
import { API_URL } from 'config/api'
import { CookieKeys } from 'constants/CookieKeys'
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: `${API_URL}`,
  timeout: 30000,
})

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get(CookieKeys.authToken)

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authToken ? authToken : ''}`,
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http
