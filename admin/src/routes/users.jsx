import axios from 'axios'
import { useEffect, useState } from 'react'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../components/shadcn/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/shadcn/dialog'
import { Skeleton } from '../components/shadcn/skeleton'
import { BASE_URL } from '../constants/config'
import { User } from './user'
import { Button } from '../components/button'
import { Plus } from 'lucide-react'
import { UserForm } from './user-form'
import { useNavigate } from 'react-router-dom'

export function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((data) => {
        setUsers(data.data.data)
      })
      .catch((e) => {
        if (e.response.status === 401) {
          navigate('/login')
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-screen-lg mt-14">
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <div className="flex justify-end">
            <Skeleton className="h-9 w-36 rounded-xl" />
          </div>
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end my-3">
            <Dialog>
              <DialogTrigger>
                <Button className="flex gap-2">
                  افزودن کاربر <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>افزودن کاربر </DialogTitle>
                </DialogHeader>
                <UserForm />
              </DialogContent>
            </Dialog>
          </div>
          <table className="w-full border-collapse border table-fixed">
            <thead>
              <tr>
                <th className="border border-slate-300 font-normal p-4 text-right">
                  نام
                </th>
                <th className="border border-slate-300 font-normal p-4 text-right">
                  نام کاربری
                </th>
                <th className="border border-slate-300 font-normal p-4 text-right w-36">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User user={user} key={user.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
