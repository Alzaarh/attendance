import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Login } from './routes/login'
import { AuthContext } from './stores/auth-context'

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn)
    return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Login />
      </AuthContext.Provider>
    )

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Outlet />
    </AuthContext.Provider>
  )
}
