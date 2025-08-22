import type { AuthResponse } from '@/types/auth'
import { api } from '@/lib/axios'

export const registerUser = async ({
  email,
  name,
  password,
}: {
  email: string
  name: string
  password: string
}): Promise<AuthResponse> => {
  try {
    const res = await api.post('/auth/register', {
      email,
      name,
      password,
    })
    return res.data // { accesstoken, user }
  } catch (err: any) {
    // Handle structured error message if it exist
    const message = err.response?.data?.message || 'Failed to register'
    throw new Error(message)
  }
}

export const loginUser = async (credential: {
  email: string
  password: string
}): Promise<AuthResponse> => {
  try {
    const res = await api.post('/auth/login', credential)
    return res.data
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to log in'
    throw new Error(message)
  }
}

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout')
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to logout'
    throw new Error(message)
  }
}

export const refreshAccessToken = async (): Promise<AuthResponse> => {
  try {
    const res = await api.post('/auth/refresh')
    if (!res.data) throw new Error('No refresh token, please Login')
    return res.data
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to refresh token'
    throw new Error(message)
  }
}
