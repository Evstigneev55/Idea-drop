import { useMutation } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { registerUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: () => registerUser({ email, name, password }),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigate({ to: '/ideas' })
    },
  })

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await mutateAsync()
    } catch (err: any) {
      console.log(err?.message)
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
      {isError && (
        <div className='text-red-700 px-4 py-2 rounded bg-red-100 mb-4'>
          {error.message}
        </div>
      )}
      <form onSubmit={onSubmitHandler} className='space-y-4'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          name='name'
          placeholder='Name'
          autoComplete='off'
          className='w-full border border-gray rounded-md p-2'
        />
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
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className='text-center text-sm mt-4'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-600 hover:underline font-medium'>
          Log in
        </Link>
      </p>
    </div>
  )
}
