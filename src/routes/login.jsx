import { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components/button'
import { Input } from '../components/input'
import { Label } from '../components/label'
import { AuthContext } from '../stores/auth-context'

const USERNAME = 'admin'
const PASSWORD = '12345'

export function Login() {
  const { setIsLoggedIn } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (username === USERNAME && password === PASSWORD) {
      setIsLoggedIn(true)
      navigate('/dashboard/user')
    } else toast('نام کاربری یا رمز عبور اشتباه است.')
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
        <Button type="submit">ورود</Button>
      </form>
      <Toaster
        position="bottom-right"
        toastOptions={{ style: { background: '#e63946', color: '#fff' } }}
      />
    </div>
  )
}
