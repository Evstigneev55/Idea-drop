import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { loginUser } from '@/api/auth'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAccessToken, setUser } = useAuth()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigate({ to: '/ideas' })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await mutateAsync({ email, password })
  }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Login</h1>
      {isError && (
        <div className='text-red-700 px-4 py-2 rounded bg-red-100 mb-4'>{error.message}</div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name='email'
          placeholder='Email'
          className='w-full border border-gray rounded-md p-2'
        />
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name='password'
          placeholder='Password'
          autoComplete='off'
          className='w-full border border-gray rounded-md p-2'
        />
        <button
          disabled={isPending}
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 font-semibold rounded-md w-full disabled:opacity-50 '
        >
          {isPending ? 'Logging...' : 'Login'}
        </button>
      </form>

      <p className='text-center text-sm mt-4'>
        Don't have an account?{' '}
        <Link
          to='/register'
          className='text-blue-600 hover:underline font-medium'
        >
          Register
        </Link>
      </p>
    </div>
  )
}
