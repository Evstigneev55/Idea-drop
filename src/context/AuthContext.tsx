import { createContext, useContext, useEffect, useState } from 'react'
import { refreshAccessToken } from '@/api/auth'
import { storeAccessToken } from '@/lib/authToken'

const AuthContext = createContext<AuthContextType | undefined>({
  accessToken: '',
  setAccessToken: () => {},
  setUser: () => {},
  user: { id: '', email: '', name: '' },
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthContextType['user']>(null)

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const res = await refreshAccessToken()
        setAccessToken(res.accessToken)
        setUser(res.user)
      } catch (err) {
        console.error('Failed to refresh access token: ', err)
      }
    }
    loadAuth()
  }, [])

  useEffect(() => {
    storeAccessToken(accessToken)
  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used without provider!')
  return context
}

interface AuthContextType {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  user: { id: string; email: string; name: string } | null
  setUser: (user: AuthContextType['user']) => void
}
