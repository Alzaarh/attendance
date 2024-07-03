import { LogOut } from 'lucide-react'
import { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from '../components/button'

import { AuthContext } from '../stores/auth-context'

export function Dashboard() {
  const { setIsLoggedIn } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/dashboard/user">کاربران</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/system">حضور و غیاب</NavLink>
          </li>
          <li>
            <Button variant="icon" onClick={() => setIsLoggedIn(false)}>
              <LogOut />
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
