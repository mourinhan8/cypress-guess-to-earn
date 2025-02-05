import axios from "axios"
import { APP_TOKEN_KEY } from "./constants"

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

instance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      const token = window.localStorage.getItem(APP_TOKEN_KEY)
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem(APP_TOKEN_KEY)
      window.location.reload()
      return
    }
    return Promise.reject(error)
  }
)

export default instance
