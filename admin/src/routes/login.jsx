import { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/button'
import { Input } from '../components/input'
import { Label } from '../components/label'
import { AuthContext } from '../stores/auth-context'
import axios from 'axios'
import { BASE_URL } from '../constants/config'
import { RotateCw } from 'lucide-react'

export function Login() {
  const { setIsLoggedIn } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`${BASE_URL}/auth/admin/login`, {
        username,
        password,
      })
      .then((data) => {
        console.log(data)
        setIsLoggedIn(true)
        localStorage.setItem('token', data.data.data)
        toast.success('ورود با موفقیت انجام شد.')
        setTimeout(() => {
          navigate('/dashboard/user')
        }, 1000)
      })
      .catch((error) => {
        if (error.message === 'Network Error')
          toast.error('مشکلی در اتصال به اینترنت پیش آمده.')
        else toast.error('نام کاربری یا رمز عبور اشتباه است.')
      })
      .finally(() => setIsLoading(true))
  }

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <Label id="username">نام کاربری</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <Label id="password">رمز عبور</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="flex justify-center">
          {isLoading ? <RotateCw className="animate-spin" /> : 'ورود'}
        </Button>
      </form>
      <Toaster
        position="top-left"
        toastOptions={{ style: { color: '#000' } }}
      />
    </div>
  )
}
