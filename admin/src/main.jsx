import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

// import { App } from './app.jsx'
import './index.css'
import { Dashboard } from './routes/dashboard.jsx'
import { Users } from './routes/users.jsx'
import { Login } from './routes/login.jsx'
import { System } from './routes/system'
import ImageNOtFound from './assets/image/notFound.jpg'
import { Report } from './routes/report.jsx'

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
          { path: 'report', element: <Report /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="w-[100vw] h-[100vh] overflow-hidden">
        <img src={ImageNOtFound} alt="404" useMap="#map" />

        <map name="map">
          <area
            alt="404"
            title="back"
            coords="829,741,552,751,420,811,215,960,9,927,4,1061,243,1079,1271,1035,1897,1058,1751,977,1521,948,1395,861,1270,812,1288,783,1115,741,1105,773"
            shape="poly"
            className="cursor-pointer h-5 w-4 bg-black"
            onClick={() => {
              router.navigate(-1)
            }}
          />
        </map>
      </div>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
