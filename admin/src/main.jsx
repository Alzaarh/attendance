import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

// import { App } from './app.jsx'
import './index.css'
import { Dashboard } from './routes/dashboard.jsx'
import { Users } from './routes/users.jsx'
import { Login } from './routes/login.jsx'
import { System } from './routes/system'
import ImageNOtFound from './assets/image/notFound.jpg'

export function Parent() {
  localStorage.getItem('token')
  if (!localStorage.getItem('token')) return <Login />
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Parent />,
    children: [
      { path: '/login', element: <Login /> },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          { path: 'user', element: <Users /> },
          { path: 'system', element: <System /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="w-[100vw] h-[100vh] overflow-hidden">
        <img src={ImageNOtFound} alt="404" />
      </div>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
