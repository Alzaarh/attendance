import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import { App } from './app.jsx'
import './index.css'
import { Dashboard } from './routes/dashboard.jsx'
import { Users } from './routes/users.jsx'
import { Login } from './routes/login.jsx'
import { System } from './routes/system'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: 'user', element: <Users /> },
      { path: 'system', element: <System /> },
    ],
  },
  {
    path: '*',
    element: <div>not found</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
