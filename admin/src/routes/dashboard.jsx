import { LogOut } from 'lucide-react'
import { useContext} from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '../components/button'

import { AuthContext } from '../stores/auth-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/shadcn/tooltip'
import { cn } from '../lib/utils'

export function Dashboard() {
  const { setIsLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate()

  function handleLogOut() {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink
              to="/dashboard/user"
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 hover:text-gray-900 hover:bg-gray-100   rounded-md ',
                  isActive && 'bg-black text-white '
                )
              }
            >
              کاربران
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/system"
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 -mr-14 hover:text-gray-900 hover:bg-gray-100  rounded-md',
                  isActive && 'bg-black text-white  '
                )
              }
            >
              حضور و غیاب
            </NavLink>
          </li>
          <li>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="icon"
                    className="bg-white text-black hover:bg-black/5"
                    onClick={() => handleLogOut()}
                  >
                    <LogOut />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>خروج</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
