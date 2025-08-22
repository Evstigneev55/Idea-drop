import axios from 'axios'
import { getStoredAcessToken, storeAccessToken } from './authToken'
import { refreshAccessToken } from '@/api/auth'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getStoredAcessToken()

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        const { accessToken: newToken } = await refreshAccessToken()
        storeAccessToken(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        console.log('Refresh token failed. ', err)
      }
    }

    return Promise.resolve(error)
  }
)

export { api }
